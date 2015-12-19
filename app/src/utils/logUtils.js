/* @flow */
/*eslint-disable no-console */
const ENV: string = process.env.NODE_ENV;

const debugConfig: string = `
  color:#555;
  background:rgba(85,85,85,.15);
  padding:5px;
  line-height:19px;
  border-radius:2px;
  `;

const infoConfig: string = `
  color:#238ACC;
  background:rgba(35,138,204,.15);
  padding:5px;
  line-height:19px;
  border-radius:2px;
  `;

const successConfig: string = `
  color:#0A9947;
  background:rgba(10,153,71,.15);
  padding:5px;
  line-height:19px;
  border-radius:2px;
  `;

const warningConfig: string = `
  color:#E85B0B;
  background:rgba(232,91,11,.15);
  padding:5px;
  line-height:19px;
  border-radius:2px;
  `;

const errorConfig: string = `
  color:#E82C0C;
  background:rgba(232,44,12,.15);
  padding:5px;
  line-height:17px;
  border-radius:2px;
  `;

const highlightConfig: string = `
  color:#FBA5EE;
  background:RGBA(90, 43, 240, 1);
  padding:5px;
  line-height:17px;
  border-radius:2px;
  `;

const activeEnvironment: boolean = !!((ENV === 'development') || (ENV === 'test'));

export default {
  debug(msg: string, ...objs: Array<any>): any {
    if (activeEnvironment) {
      return console.debug('%cDebug:%s', debugConfig, msg, objs);
    }
  },
  info(msg: string, ...objs: Array<any>): any {
    if (activeEnvironment) {
      return console.info('%cInfo:%s', infoConfig, msg, objs);
    }
  },
  success(msg: string, ...objs: Array<any>): any {
    if (activeEnvironment) {
      return console.log('%cSuccess:%s', successConfig, msg, objs);
    }
  },
  warning(msg: string, ...objs: Array<any>): any {
    if (activeEnvironment) {
      return console.warn('%cWarning:%s', warningConfig, msg, objs);
    }
  },
  error(msg: string, ...objs: Array<any>): any {
    return console.error('%cError:%s', errorConfig, msg, objs);
  },
  highlight(msg: string, ...objs: Array<any>): any {
    if (activeEnvironment) {
      return console.warn('%cHIGHLIGHT:%s', highlightConfig, msg, objs);
    }
  },
  time(title: string): any {
    if (activeEnvironment) {
      return console.time(title);
    }
  },
  timeEnd(title: string): any {
    if (activeEnvironment) {
      return console.timeEnd(title);
    }
  },
};
/*eslint-enable */
