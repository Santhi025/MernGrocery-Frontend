

const InvoiceSkeleton = () => {
  return (
    <div className="invoiceContainer invoiceSkeletonWrapper">

      <h2 className="skeleton invoiceSkeletonTitle"></h2>

      {/* ITEMS */}
      <div className="invoiceSkeletonList">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="invoiceSkeletonItem" key={i}>
            
            {/* image */}
            <div className="skeleton invoiceSkeletonImage" />

            {/* details */}
            <div className="invoiceSkeletonDetails">
              <div className="skeleton invoiceSkeletonLineTitle" />
              <div className="skeleton invoiceSkeletonLineSmall" />
              <div className="skeleton invoiceSkeletonLinePrice" />
            </div>

          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="invoiceSkeletonSummary">
        <div className="skeleton invoiceSkeletonSummaryLine" />
        <div className="skeleton invoiceSkeletonSummaryLine" />
        <div className="skeleton invoiceSkeletonSummaryLine" />
        <div className="skeleton invoiceSkeletonSummaryTotal" />
      </div>

      <div className="invoiceSkeletonCheckout">
        <div className="skeleton invoiceSkeletonButton" />
      </div>

    </div>
  );
};

export default InvoiceSkeleton;