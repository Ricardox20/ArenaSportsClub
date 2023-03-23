import React, { Fragment } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiSoccerBall } from "react-icons/gi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function ResultsChampionship({ matchsData, buttonExpand, setButtonExpand }) {
  const changeExpand = (key) => {
    setButtonExpand(
      buttonExpand.map((item) => {
        if (item.i === key && item.value === true)
          return { i: key, value: false };
        else if (item.i === key && item.value === false)
          return { i: key, value: true };

        return item;
      })
    );
  };

  const haveMatchs = (date) => {
    if (date.matchs.length > 0) return true;
    else return false;
  };

  const checkLastEvent = (match) => {
    let event = "";
    if (match.events?.length > 0) {
      let timeLastEvent = parseInt(
        match.events[match.events?.length - 1].time.replace("'", "")
      );
      let timeMatch = parseInt(match.time.replace("MIN", ""));

      if (
        match.events[match.events.length - 1].type === "GOAL" &&
        timeMatch <= timeLastEvent + 2
      ) {
        event = "GOL";
      }
    }

    return event;
  };

  return matchsData?.map((date, i) =>
    haveMatchs(date) ? (
      <div key={i}>
        <div className="championship-results">
          <Col md={1} className="col-championship-results">
            <button
              onClick={(e) => {
                e.preventDefault();
                changeExpand(i);
              }}
              className="button-championship-results"
            >
              {buttonExpand[i]?.value ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </button>
          </Col>
          <Col md={10} className="col-championship-results">
            <span className="text-championship-results">{date._id.day}</span>
          </Col>
        </div>

        {buttonExpand[i]?.value ? (
          date?.matchs.map((match, i) => (
            <Link
              to={`/partida/${match.idMatch}`}
              className="link-results"
              key={i}
            >
              <ListGroup className="match">
                <Col className="align-results" md={1}>
                  {match.status === "AO VIVO" ? (
                    checkLastEvent(match) !== "" ? (
                      <>
                        <span className="matchs-text-results">
                          {match.time}
                        </span>
                        <GiSoccerBall className="goal-effect-results" />
                      </>
                    ) : (
                      <span className="matchs-text-results">{match.time}</span>
                    )
                  ) : match.status === "ENCERRADO" ? (
                    <span className="matchs-text-results">ENCERRADO</span>
                  ) : (
                    <span className="matchs-text-results">
                      {match.schedule}
                    </span>
                  )}
                </Col>

                <Col className="align-team-home-results" md={3}>
                  <span className="matchs-text-results name-team-results">
                    {match.teams?.homeName}
                  </span>
                </Col>
                <Col className="align-results" md={1}>
                  <img
                    className="img-results"
                    src={match.teams?.homeImg}
                    alt={`${match.teams?.homeName}`}
                    title={`${match.teams?.homeName}`}
                  />
                </Col>
                <Col className="align-results" md={2}>
                  <Col className="align-results" md={5}>
                    <span className="match-number-results">
                      {match.scoreHome}
                    </span>
                  </Col>
                  <Col className="align-results" md={2}>
                    <span className="match-results">-</span>
                  </Col>
                  <Col className="align-results" md={5}>
                    <span className="match-number-results">
                      {match.scoreAway}
                    </span>
                  </Col>
                </Col>
                <Col className="align-results" md={1}>
                  <img
                    className="img-results"
                    src={match.teams?.awayImg}
                    alt={`${match.teams?.awayName}`}
                    title={`${match.teams?.awayName}`}
                  />
                </Col>
                <Col className="align-team-away-results" md={3}>
                  <span className="matchs-text-results name-team-results">
                    {match.teams?.awayName}
                  </span>
                </Col>
              </ListGroup>
              {i !== date?.matchs.length - 1 ? (
                <hr className="border-match" />
              ) : (
                <></>
              )}
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    ) : (
      <Fragment key={i}></Fragment>
    )
  );
}

export default ResultsChampionship;
