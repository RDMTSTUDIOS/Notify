
export default class NotifyError extends Error {

    private static codesMap: NCodeMap = {
        1: 'AT LEAST ONE PARAMETER MUST BE PROVIDED',
        2: 'NOT ALL NECESSARY PARAMETERS PROVIDED',
        3: 'NAME ALREDY TAKEN',
        4: 'WRONG PARAMETER',
    };

    constructor(code: number, message?: string) {
        super(`\n\n${message}\n`);
        this.name = `Notify. Error code ${code}: ${NotifyError.codesMap[code]}`;
    };
};

interface NCodeMap {
    [key: number]: string;
}