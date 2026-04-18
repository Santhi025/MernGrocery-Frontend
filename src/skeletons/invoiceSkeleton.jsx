// const InvoiceSkeleton = () => {
//   return (
//     <div className="invoiceContainer">

//       <h2 className="Invoiceskeleton title"></h2>

//       {/* ITEMS */}
//       <div className="invoiceList">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <div className="invoiceItem InvoiceskeletonItem" key={i}>
            
//             {/* image */}
//             <div className="Invoiceskeleton image" />

//             {/* details */}
//             <div className="invoiceDetails">
//               <div className="Invoiceskeleton line title" />
//               <div className="Invoiceskeleton line small" />
//               <div className="Invoiceskeleton line price" />
//             </div>

//           </div>
//         ))}
//       </div>

//       {/* SUMMARY */}
//       <div className="invoiceSummary">
//         <div className="Invoiceskeleton summaryLine" />
//         <div className="Invoiceskeleton summaryLine" />
//         <div className="Invoiceskeleton summaryLine" />
//         <div className="Invoiceskeleton summaryTotal" />
//       </div>

//       <div className="checkoutBox">
//         <div className="Invoiceskeleton button" />
//       </div>

//     </div>
//   );
// };

// const InvoiceSkeleton = () => {
//   return (
//     <div className="invoiceContainer invoiceSkeleton">

//       <h2 className="skeleton title"></h2>

//       {/* ITEMS */}
//       <div className="invoiceList">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <div className="invoiceItem invoiceSkeletonItem" key={i}>
            
//             {/* image */}
//             <div className="skeleton image" />

//             {/* details */}
//             <div className="invoiceDetails">
//               <div className="skeleton line title" />
//               <div className="skeleton line small" />
//               <div className="skeleton line price" />
//             </div>

//           </div>
//         ))}
//       </div>

//       {/* SUMMARY */}
//       <div className="invoiceSummary" style={{height:"100px"}}>
//         <div className="skeleton summaryLine" />
//         <div className="skeleton summaryLine" />
//         <div className="skeleton summaryLine" />
//         <div className="skeleton summaryTotal" />
//       </div>

//       <div className="checkoutBox">
//         <div className="skeleton button" />
//       </div>

//     </div>
//   );
// };

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