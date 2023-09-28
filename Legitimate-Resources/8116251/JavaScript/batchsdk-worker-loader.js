/**
 *  * @file
 *   * Batch JS integrations.
 *    */

if( 'function' === typeof importScripts) {
  importScripts("https://via.batch.com/v3/worker.min.js");

  const eventsList = ["pushsubscriptionchange", "install", "push", "notificationclick", "message"];
  eventsList.forEach(eventName => {
    self.addEventListener(eventName, event => {
      event.waitUntil(self.handleBatchSDKEvent(eventName, event));
    });
  });
}
