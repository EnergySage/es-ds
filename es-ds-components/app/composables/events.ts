import mitt from 'mitt';

// create a singleton global event bus
const emitter = mitt();

// expose the singleton via a composable
export function useEsdsEvents() {
    return emitter;
}
