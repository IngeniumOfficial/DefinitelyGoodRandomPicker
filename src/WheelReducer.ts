
interface PayloadType{
    location?: string,
    addInput?: number,
    deleteInput?: number,
    inputData?: string
}

export default function WheelReducer(state: any, payload: PayloadType) {
    if("addInput" in payload){
        switch(payload.addInput) {
            case 2:
                return { ...state, third: { title: "Third Input", value: 1, color: '#6A2135' } };
            case 3:
                return { ...state, fourth: { title: "Fourth Input", value: 1, color: '#214F84' } };
            case 4:
                return { ...state, fifth: { title: "Fifth Input", value: 1, color: '#3CEF1F' } };
            default:
                return state;
        }
    } else if('location' in payload) {
        switch(payload.location){
            case 'first':
                return { ...state, first: { title: payload.inputData, value: 1, color: '#E38627' } };
            case 'second':
                return { ...state, second: { title: payload.inputData, value: 1, color: '#C13C37' } };
            case 'third':
                return { ...state, third: { title: payload.inputData, value: 1, color: '#6A2135' } };
            case 'fourth':
                return { ...state, fourth: { title: payload.inputData, value: 1, color: '#214F84' } };
            case 'fifth':
                return { ...state, fifth: { title: payload.inputData, value: 1, color: '#3CEF1F' } };
        }
    } else if('deleteInput' in payload) {
        const newState = { ...state }
        switch(payload.deleteInput) {
            case 3:
                delete newState['third'];
                return newState;
            case 4:
                delete newState['fourth'];
                return newState;
            case 5:
                delete newState['fifth'];
                return newState;
            default:
                return newState;
        }
    }
}