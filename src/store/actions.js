export const getInvoices = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call
        const firestore = getFirestore();
        console.log('payload', payload)
        payload.startAt += 11
        firestore.collection('invoices2')
            .orderBy(payload.orderBy, payload.orderByDirection)
            .limit(payload.limit)
            .onSnapshot((querySnapshot) => {
                var invoices = [];
                querySnapshot.forEach(function (doc) {
                    invoices.push(doc.data());
                });
                console.table(invoices)
                payload.invoices = invoices
                dispatch({ type: 'INVOICES_GET', payload: payload })
            })
    }
};


export const getInvoicesNext = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        let query = getState().invoices.queryPayload

        console.log(payload)
        console.log(query)
        console.log('last invoice', payload.invoices[payload.invoices.length - 1])
        let lastInvoice = payload.invoices[payload.invoices.length - 1]
        const firestore = getFirestore();

        if (lastInvoice) {
            firestore.collection('invoices2').doc(lastInvoice.id.toString()).get().then(
                (doc) => {
                    if (doc.exists) {
                        firestore.collection('invoices2')
                            .orderBy(query.orderBy, query.orderByDirection)
                            .startAfter(doc)
                            .limit(query.limit)
                            .get()
                            .then((querySnapshot) => {
                                console.log(querySnapshot)
                                var invoices = [];
                                querySnapshot.forEach(function (doc) {
                                    invoices.push(doc.data());
                                });
                                console.log(invoices)
                                console.table(invoices)
                                payload = {}
                                payload.invoices = invoices
                                payload.queryPayload = query;
                                dispatch({ type: 'INVOICE_GETMORE', payload: payload })

                            })
                    }
                    else {
                        console.log('doc not found')
                    }
                }
            )
        } else {
            console.log('last invoice not found')
        }

    }
};


export const getInvoiceTotal = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('invoices2').doc('ledger')
            .onSnapshot((doc) => {
                let payload = {}
                payload.grandTotal = doc.data().grandTotal2

                dispatch({ type: 'INVOICE_GETTOTAL', payload: payload })
            })


        // setting a total for the first time
        // firestore.collection('invoices2').where('id', '>=', 0) .get()
        // .then(ss => {
        //     let total = 0
        //     ss.forEach(x=>{
        //         let data = x.data();

        //         let subTotal = data.actual_amount + data.adjustments;

        //         //.set({subTotal: subTotal} , {merge: true})
        //         total = total +subTotal;

        //     })
        //     console.log(total);
        //     firestore.collection('invoices2').doc('ledger').set({grandTotal2: total}, {merge: true})
        // })
    }
}

export const sortOnClick = (orderBy, orderByDirection) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        console.log('state', getState())
        console.log('before', orderBy)
        console.log('before', orderByDirection)
        let queryPayload = getState().invoices.queryPayload
        if (queryPayload.orderBy === orderBy && queryPayload.orderByDirection === orderByDirection) {
            if (orderByDirection == 'asc') {
                orderByDirection = 'desc'
            } else {
                orderByDirection = 'asc'
            }
        }
        console.log('after', orderBy)
        console.log('after', orderByDirection)
        const firestore = getFirestore();
        firestore.collection('invoices2')
            .orderBy(orderBy, orderByDirection)
            //.startAt(0)
            .limit(11)
            .onSnapshot((querySnapshot) => {
                let invoices = [];
                querySnapshot.forEach(function (doc) {
                    invoices.push(doc.data());
                });
                console.table(invoices)
                let payload = {}
                payload.orderByDirection = orderByDirection
                payload.orderBy = orderBy
                payload.invoices = invoices
                payload.startAt = 0
                payload.limit = 11
                dispatch({ type: "SORT_ONCLICK", payload: payload })
            })
    }
}


export const updateAdjustments = (invoice, newAdjustment) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call
        const firestore = getFirestore();
        console.log('invoice', invoice)
        console.log('newAdjustment', newAdjustment)
        console.log('invoice adj', invoice.adjustments)


        firestore.collection('invoices2').doc(invoice.id.toString())
            .update({ adjustments: Number.parseFloat(newAdjustment) })
            .then(
                dispatch({ type: 'INVOICE_UPDATEADJUSTMENTS', payload: invoice })
            )

        firestore.collection('invoices2').doc('ledger')
            .get().then((doc) => {
                if (doc.exists) {
                    console.log(doc.data())
                    firestore.collection('invoices2').doc('ledger')
                        .update({ grandTotal2: doc.data().grandTotal2 + (newAdjustment - invoice.adjustments) })
                }
            })

    }
};
