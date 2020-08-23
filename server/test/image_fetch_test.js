//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;
const path = require("path");

chai.use(chaiHttp);

describe('Image Fetch Test', () => {

    // before((done) => {
    //    //create new db
    // });

    //test normal fetch with no condition
    describe('/POST /api/image/fetchResult', () => {
        it('it should return all entries present in db', (done) => {
            chai.request(server)
                .post('/api/image/fetchResult')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body["message"]).to.include("success");
                    done();
                })
        });
    })

    //test normal fetch with condition where data is present in preload
    describe('/POST /api/image/fetchResult', () => {
        const querCondition = {
            "conditions": {
                "description": "test",
                "fileTypes": ["image/png"]
            }
        };
        it('it should return all entries present in db', (done) => {
            chai.request(server)
                .post('/api/image/fetchResult', querCondition)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body["message"]).to.include("success");
                    done();
                })
        });
    })

    //test normal fetch with condition where data is not present in preload
    describe('/POST /api/image/fetchResult', () => {
        const querCondition = {
            "conditions": {
                "description": "test1232123",
                "fileTypes": ["image/png"]
            }
        };
        it('it should return all entries present in db', (done) => {
            chai.request(server)
                .post('/api/image/fetchResult', querCondition)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body["message"]).to.include("success");
                    done();
                })
        });
    })

});