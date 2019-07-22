import { connect } from "react-redux";
import InvoiceList from "../presentation/InvoiceList"
import { getInvoices, getInvoicesNext, getInvoiceTotal, sortOnClick, updateAdjustments } from '../store/actions'

function mapStateToProps(state) {
  return {
    invoices: state.invoices,
    queryPayload: state.queryPayload
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sortOnClick: (orderBy, orderByDirection) => dispatch(sortOnClick(orderBy, orderByDirection)),
    onInvoiceClick: (index) => dispatch({ type: "INVOICE_ONCLICK", payload: index }),
    onLoad: ({ payload }) => dispatch(getInvoices(payload)),
    getInvoicesNext: (invoices) => dispatch(getInvoicesNext(invoices)),
    getInvoiceTotal: () =>dispatch(getInvoiceTotal()),
    updateAdjustments: (invoice,newAdjustment)=>dispatch(updateAdjustments(invoice,newAdjustment)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceList);
