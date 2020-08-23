// test/models/user.js
import chai, {assert} from 'chai';
import truncate from './truncate';
import userFactory from 'test/factories/user';

describe('User model', () => {
    let user;
    beforeEach(async () => {
        await truncate();
        user = await userFactory();
    });
    it('should do something', async () => {
        // TODO
    });
});