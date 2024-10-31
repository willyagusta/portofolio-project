import pg from 'pg';
import { connectToDatabase } from '../db/dbconn'; // Import the connect function

jest.mock('pg');

describe('Database Connection', () => {
    it('should connect to PostgreSQL successfully', async () => {
        console.log('[TEST] Mocking successful PostgreSQL connection...');
        
        // Mock the connect method to return a client object with a release method
        const mockClient = { release: jest.fn() };
        pg.Pool.prototype.connect.mockResolvedValueOnce(mockClient);

        console.log('[TEST] Attempting to connect to the database...');
        await connectToDatabase(); // Call the connect function

        console.log(
            '[TEST] Verifying PostgreSQL connection was called...'
        );
        expect(pg.Pool.prototype.connect).toHaveBeenCalled();
        expect(mockClient.release).toHaveBeenCalled(); // Ensure release was called
        console.log('[TEST] PostgreSQL connection test passed successfully');
    });

    it('should handle PostgreSQL connection errors', async () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const processExitSpy = jest
            .spyOn(process, 'exit')
            .mockImplementation(() => {});

        console.log('[TEST] Mocking PostgreSQL connection error...');
        pg.Pool.prototype.connect.mockRejectedValueOnce(new Error('Connection error'));

        console.log('[TEST] Attempting to connect to the database...');
        await connectToDatabase(); // Call the connect function to trigger error handling

        console.log('[TEST] Verifying error handling for PostgreSQL connection...');
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Failed to connect to the database:',
            expect.any(Error)
        );
        expect(processExitSpy).toHaveBeenCalledWith(1);
        console.log('[TEST] PostgreSQL connection error handling test passed');

        consoleErrorSpy.mockRestore();
        processExitSpy.mockRestore();
    });
});