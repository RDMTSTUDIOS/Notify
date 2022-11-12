import Notify from "./core";

export default function NotifyTest(): void {

    const TestEntity = Notify.initConsole({
        id: 'Test Console',
        historySize: 10,
        logger: true,
    });

    TestEntity.display();
    console.log(TestEntity.logs(true));

    let i: number = 0;
    const TestTimer = setInterval(()=>{
        i++;
        TestEntity.message(`Test Message: ${i}`);
        if (i === 18) { clearInterval(TestTimer); TestLog()};
    }, 300);

    function TestLog() {
        TestEntity.message(`Messages amount that must were send - ${i}. Logs amount must be - ${i+1}.`)
        console.log(TestEntity.info);
        console.log(TestEntity.logs(true));
        TestEntity.message('Test ended with code 0. Logs are displayed in console.');
        TestEntity.clear(true);
        console.log(TestEntity.clear());
        TestEntity.clear();
        console.log(TestEntity.logs(true));
    };

};
