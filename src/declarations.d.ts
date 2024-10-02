declare module "*.png" {
    const content: any;
    export default content;
  }
  declare module "*.svg" {
    const content: any;
    export default content;
  }
  
  declare namespace chrome {
    var tabs: {
      query: (queryInfo: chrome.tabs.QueryInfo) => Promise<chrome.tabs.Tab[]>;
    };
  }
  