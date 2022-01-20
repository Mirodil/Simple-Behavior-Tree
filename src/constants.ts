/**
* Status of a node that has not yet run on this tree traversal.
* @constant READY
* @type {number}
* @public
* @final
*/
export const READY: number = 0;

/**
* Status of a node that has succeeded in its task.
* @constant SUCCESS
* @type {number}
* @public
* @final
*/
export const SUCCESS: number = 1;

/**
* Status of a node that has failed in its task.
* @constant FAILURE
* @type {number}
* @public
* @final
*/
export const FAILURE: number = 3;

/**
* Status of a node that has encountered an error.
* @constant ERROR
* @type {number}
* @public
* @final
*/
export const ERROR: number = 4;

/**
 * Status of a node
 */
export type STATUS = typeof READY | typeof SUCCESS | typeof FAILURE;
