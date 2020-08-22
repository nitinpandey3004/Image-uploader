//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;
const path = require("path");

chai.use(chaiHttp);

describe('Image Upload', () => {

    /**
     * Test normal Image upload
     */
    describe("/POST /api/image", () => {
        it('it should upload an image to aws', (done) => {
            chai.request(server)
                .post('/api/image/upload')
                .attach('image', path.join(__dirname, '/../../setup/data/test1.jpg'), 'test1.jpg')
                .type('form')
                .field('description', 'This is test desc')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body["message"]).to.include("uploaded successfully")
                    done();

                })
        });

        //upload image with size greater than 1mb
        it('it should throw an error of file size too large', (done) => {
            chai.request(server)
                .post('/api/image/upload')
                .attach('image', path.join(__dirname, '/../../setup/data/test_1mb.jpg'), 'test_1mb.jpg')
                .type('form')
                .field('description', 'This is test desc')
                .end((err, res) => {
                    console.log(res.body);
                    expect(res).to.have.status(422)
                    expect(res.body["errors"][0]["detail"]).to.include("image is too large.")
                    // expect(res.body["errors"][0]["detail"]).to.include("File too large");
                    done();
                })
        })

        //upload with not allowed extension
        it('it should throw an error of file not supported', (done) => {
            chai.request(server)
                .post('/api/image/upload')
                .attach('image', path.join(__dirname, '/../../setup/data/test1.jpg1'), 'test1.jpg1')
                .type('form')
                .field('description', 'This is test desc')
                .end((err, res) => {
                    console.log(res.body);
                    expect(res).to.have.status(422)
                    expect(res.body["errors"][0]["detail"]).to.include("image has invalid file format.")
                    done();
                })
        })

        //try to upload without description
        it('it should throw 422', (done) => {
            chai.request(server)
                .post('/api/image/upload')
                .attach('image', path.join(__dirname, '/../../setup/data/test1.jpg'), 'test1.jpg')
                .type('form')
                .end((err, res) => {
                    expect(res).to.have.status(422)
                    done();

                })
        });

        //try to upload without image
        it('it should throw image required error', (done) => {
            chai.request(server)
                .post('/api/image/upload')
                .type('form')
                .field('description', 'This is test desc')
                .end((err, res) => {
                    expect(res).to.have.status(422)
                    done();

                })
        });

        //try to access invalid path
        it('it should throw not found error', (done) => {
            chai.request(server)
                .post('/api/image/upload/test')
                .type('form')
                .field('description', 'This is test desc')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                })
        });

    })
});