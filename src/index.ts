import { READY, SUCCESS, FAILURE, ERROR } from './constants';
import BehaviorTree from './behaviorTree';
import Failure from './failure';
import InnerNode from './innerNode';
import BaseNode from './baseNode';
import Inverter from './inverter';
import Selector from './selector';
import Sequencer from './sequencer';
import Success from './success';
import BaseState from './baseState';

export {
    READY,
    SUCCESS,
    FAILURE,
    ERROR,
    BehaviorTree,
    BaseNode,
    InnerNode,
    Selector,
    Sequencer,
    Inverter,
    Success,
    Failure,
    BaseState
}

// pre-register pre-defined types
BehaviorTree.define(Selector);
BehaviorTree.define(Sequencer);
BehaviorTree.define(Inverter);
BehaviorTree.define(Success);
BehaviorTree.define(Failure);

export default BehaviorTree;
