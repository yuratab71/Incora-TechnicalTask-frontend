import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setDetails } from "../../redux/reducers/detailsReducer";
import dateStringCutter from "../../common/helpers/dateCutter";
import Progress from "../../common/components/CircularProgress/CircularProgress";
import { useHistory } from "react-router-dom";
import "./details.css";

const Details = ({ location, token, data, setDetails, logout, isFetching }) => {
  useEffect(() => {
    const id = location.pathname.split("/")[2];
    setDetails(token, id, logout);
  }, []);

  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="details_container">
      <button onClick={handleGoBack} className="goBack_button">
        Go Back
      </button>
      {isFetching ? (
        <Progress />
      ) : (
        <div className="details_wrapper">
          <div className="image_wrapper">
            <img className="details_image" src={data.imageUrl} />
          </div>
          <div className="info_container">
            <div>
              <h2>{data.name}</h2>
            </div>
            <hr />
            <div className="details_description">{data.description}</div>
            <div className="author_info">
              <div>Created by: {data.authorEmail}</div>
              <div>
                {data.modifide === "true" ? "Modified at: " : "Created at: "}
                {dateStringCutter(data.date)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    data: state.details.data,
    logout: state.auth.logout,
    isFetching: state.details.isFetching,
  };
};

export default connect(mapStateToProps, { setDetails })(Details);
