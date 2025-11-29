import Grid from "./puzzle_components/Grid";
import Header from "./puzzle_components/Header";
import Menu from "./puzzle_components/Menu";
import Timer from "./puzzle_components/Timer";
import Leaderboard from "./puzzle_components/Leaderboard";
import GridFinished from "./puzzle_components/GridFinished";
import MenuIcon from "./puzzle_components/MenuIcon";
import LeaderboardIcon from "./puzzle_components/LeaderboardIcon";
import { useEffect, useState } from "react";
import { gridFont, findEmptyCell, randomizeGrid } from "../utils/gridUtils";

const PuzzleGame = ({ changeAppState }) => {
  const [gridSize, setGridSize] = useState(16);
  const [grid, setGrid] = useState(randomizeGrid(gridSize));
  const [gridComplete, setGridComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [time, setTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [timerVisible, setTimerVisible] = useState(true);
  const [totalMoves, setTotalMoves] = useState(0);
  const [leaderboardMode, setLeaderboardMode] = useState("3x3");
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modesTabVisible, setModesTabVisible] = useState(false);
  const [guideVisible, setGuideVisible] = useState(false);
  const [empty, setEmpty] = useState(findEmptyCell(grid, gridSize));
  const [scores, setScores] = useState([]);

  const updateLeaderboardMode = (mode) => {
    setLeaderboardMode(mode);
  };

  const handleMenuClick = () => {
    setModesTabVisible(false);
    setGuideVisible(false);
    const menuState = !menuVisible;
    setMenuVisible(menuState);
  };

  useEffect(() => {
    if (gridSize === 25) {
      gridFont(4.5);
    } else {
      gridFont(6);
    }
  }, [gridSize, gridComplete]);

  return (
    <div>
      <Header title="pala_peli" />
      <div className="main-buttons">
        <MenuIcon
          handleMenuClick={handleMenuClick}
          leaderboardVisible={leaderboardVisible}
          setLeaderboardVisible={setLeaderboardVisible}
          menuVisible={menuVisible}
        />
        {timerVisible && (
          <Timer time={time} setTime={setTime} startTime={startTime} />
        )}
      </div>
      <Menu
        setGrid={setGrid}
        setGridComplete={setGridComplete}
        setTotalMoves={setTotalMoves}
        setStartTime={setStartTime}
        setGridSize={setGridSize}
        gridSize={gridSize}
        handleMenuClick={handleMenuClick}
        setGuideVisible={setGuideVisible}
        modesTabVisible={modesTabVisible}
        guideVisible={guideVisible}
        menuVisible={menuVisible}
        setModesTabVisible={setModesTabVisible}
        empty={empty}
        setEmpty={setEmpty}
        changeAppState={changeAppState}
      />
      <div
        className={`leaderboard-wrapper ${
          leaderboardVisible ? "visible" : "hidden"
        }`}
      >
        <Leaderboard
          leaderboardMode={leaderboardMode}
          updateLeaderboardMode={updateLeaderboardMode}
          setLeaderboardVisible={setLeaderboardVisible}
          scores={scores}
        />
      </div>
      {!gridComplete ? (
        <Grid
          grid={grid}
          setGrid={setGrid}
          gridSize={gridSize}
          empty={empty}
          setGridComplete={setGridComplete}
          setFinishTime={setFinishTime}
          setEmpty={setEmpty}
          time={time}
          setTimerVisible={setTimerVisible}
          totalMoves={totalMoves}
          setTotalMoves={setTotalMoves}
        />
      ) : (
        <GridFinished
          finishTime={finishTime}
          gridSize={gridSize}
          totalMoves={totalMoves}
          updateLeaderboardMode={updateLeaderboardMode}
          setLeaderboardVisible={setLeaderboardVisible}
        />
      )}
    </div>
  );
};

export default PuzzleGame;
