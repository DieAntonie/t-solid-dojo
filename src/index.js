import { createServer } from 'http';
import config from './config.json' assert { type: "json"};
import { InventoryManager as ManagerV1 } from "./v1/manager.js";

/**
 * Service function to http verb mapping helper 
 */
export class ServiceVerbMap {
  /**
   * Retrieve GET equavalent function from service
   * @param {instance} service 
   * @returns {Funtion} GET function
   */
  GET = service => service.get;
  /**
   * Retrieve POST equavalent function from service
   * @param {instance} service 
   * @returns {Funtion} POST function
   */
  POST = service => service.post;
  /**
   * Retrieve PATCH equavalent function from service
   * @param {instance} service 
   * @returns {Funtion} PATCH function
   */
  PATCH = service => service.patch;
  /**
   * Retrieve DELETE equavalent function from service
   * @param {instance} service 
   * @returns {Funtion} DELETE function
   */
  DELETE = service => service.delete;


  /**
   * Define Service function to Http verb map. 
   * @param {(service: instance) => service.Function} getMap Map to GET equavalent function.
   * @param {(service: instance) => service.Function} postMap Map to POST equavalent function.
   * @param {(service: instance) => service.Function} patchMap Map to PATCH equavalent function.
   * @param {(service: instance) => service.Function} deleteMap Map to DELETE equavalent function.
   */
  constructor(getMap = this.GET, postMap = this.POST, patchMap = this.PATCH, deleteMap = this.DELETE) {
    this.GET = getMap;
    this.POST = postMap;
    this.PATCH = patchMap;
    this.DELETE = deleteMap;
  }
};

export class ServiceWrapper {
  /** @type {instance} */
  _service;
  /** @type {ServiceVerbMap} */
  _map;

  /**
   * @param {instance} service 
   * @param {ServiceVerbMap} serviceMap 
   */
  constructor(service, serviceMap = new ServiceVerbMap()) {
    this._service = service;
    this._map = serviceMap;
  }

  serverOptions = (request, response) => {
    let verbMap = this._map[request.method];
    let verbHandler = verbMap(this._service);
    verbHandler(request, response)
  };
};

/**
 * Inventory managment domain object. 
 * @param {Request} request Incoming Server Request
 * @param {Response} response Returning Server Response
 */
export class InventoryManagementSystem {

  /** Collection of Inventory Managers */
  _managers = [];

  _routes = {};

  /**
   * Instantiate Inventory Management System 
   * @param  {...any} managers Additionl Inventory Managers
   */
  constructor(...managers) {
    this._managers = [...this._managers, ...managers.flat()];
    this._managers.forEach((manager, index) => this._routes[`v${index + 1}`] = manager.serverOptions);
  };

  /**
   * Server options for managing `InventoryManagementSystem` routing. 
   * @param {Request} request Incoming Server Request
   * @param {Response} response Returning Server Response
   */
  serverOptions = (request, response) => {
    let deconstructedRequestRoute = request.url.split('/');
    let firstRoute = deconstructedRequestRoute[1];
    let requestHandler = this._routes[firstRoute] || this.badRequestHandler;
    requestHandler(request, response);
  };

  /**
   * Unhandled Request handler
   * @param {Request} request Unhandled Server Request
   * @param {Response} response Bad Request Server Response
   */
  badRequestHandler = (request, response) => {
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.end('400 Bad Request');
  };
};

let serviceMap = new ServiceVerbMap(service => service.getHandler, service => service.postHandler, service => service.updateItem, service => service.deleteItem);

// let wrappedManager = new ServiceWrapper(new ManagerV1(), serviceMap);
// let wrappedManager = new ServiceWrapper(new ManagerV1());

// const inventoryManagementSystem = new InventoryManagementSystem(wrappedManager);
const inventoryManagementSystem = new InventoryManagementSystem(new ManagerV1());

const inventoryManagementServer = createServer(inventoryManagementSystem.serverOptions);

inventoryManagementServer.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}/`);
});