export default function NoData({closeModal2}){
    return(
        <>
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Marks Details</h2>
              <button onClick={closeModal2}>Close</button>
            </div>
            <div className="modal-body">
              <h1>NO DATA FOUND</h1>
            </div>
          </div>
        </div>
       </>
    )
}