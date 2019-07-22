const initialState = {
    invoices: [],
    queryPayload: {
        orderBy: 'id',
        orderByDirection: 'asc',
        limit: 11,
        startAt: 0
    }
};

const reducer = (state = initialState, action) => {
    console.log('initial state', initialState)
    const newState = { ...state };
    console.log('state', state)
    console.log('newstate', newState)
    switch (action.type) {
        case 'INVOICES_GET':
            console.log('invoice get')
            if (!newState.invoices) {
                newState.invoices = []
            }
            //action.payload.invoices.forEach(x => newState.invoices.push(x));
            newState.invoices = action.payload.invoices
            return newState;
        case 'INVOICE_GETMORE':
            console.log('invoices getmore')
            action.payload.invoices.forEach(x => newState.invoices.push(x));
            return newState;
        case 'SORT_ONCLICK':
            console.log('action sort click', action.payload)
            newState.invoices = action.payload.invoices
            newState.queryPayload = {
                orderBy: action.payload.orderBy,
                orderByDirection: action.payload.orderByDirection,
                limit: action.payload.limit,
                startAt: action.payload.startAt,
            }
            return newState;

        case 'INVOICE_UPDATEADJUSTMENTS':
            console.log('invoice update adjustment', action)
            return newState;
        case 'INVOICE_GETTOTAL':
            newState.grandTotal = action.payload.grandTotal
            return newState
        default:
            return newState;
    }
};

export default reducer;