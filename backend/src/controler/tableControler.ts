import Hapi = require("@hapi/hapi");

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/results',
        handler: (request, h) => {
            
            return 'Hello World!';
        }
    });
    await 
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();


function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reportingURL = "http://www...";
    };
  }
   
  @reportableClassDecorator
  class BugReport {
    type = "report";
    title: string;
   
    constructor(t: string) {
      this.title = t;
    }
  }
   
  const bug = new BugReport("Needs dark mode");
  console.log(bug.title); // Prints "Needs dark mode"
  console.log(bug.type); // Prints "report"
   
  // Note that the decorator _does not_ change the TypeScript type
  // and so the new property `reportingURL` is not known
  // to the type system:
  bug.reportingURL;