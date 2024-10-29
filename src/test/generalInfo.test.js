import { addSubscribers } from './generalInfoController.js';
import General from '../models/generalInfo.js';
import ResponseHelper from '../helpers/responseHelper.js';
import httpMocks from 'node-mocks-http';

jest.mock('../models/generalInfo');
jest.mock('../helpers/ResponseHelper');

describe('addSubscribers', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    it('should add a subscriber successfully', async () => {
        req.body = { subscriber: 'test@example.com' };
        const general = { subscribers: [], save: jest.fn() };
        General.findOne = jest.fn().mockResolvedValue(general);

        await addSubscribers(req, res, next);

        expect(general.subscribers).toContain('test@example.com');
        expect(general.save).toHaveBeenCalled();
        expect(ResponseHelper.success).toHaveBeenCalledWith(
            res,
            'Subscriber added successfully',
            expect.any(Object)
        );
    });

    it('should handle errors', async () => {
        const errorMessage = 'Error adding subscriber';
        const rejectedPromise = Promise.reject(new Error(errorMessage));
        General.findOne = jest.fn().mockReturnValue(rejectedPromise);

        await addSubscribers(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});