import {Brand} from 'utility-types';

export interface InfoJson {
  type?: string; // this is sometimes set by the frontend, e.g. by the FileUpload module
  title: string;
  author: string;
  copyright: string;
  description: string;
}

export interface CluesJson {
  across: string[];
  down: string[];
}

export interface CellData {
  value?: string;
  black?: boolean;
  number?: number;
  revealed?: boolean;
  bad?: boolean;
  good?: boolean;
  pencil?: boolean;
  isHidden?: boolean; // used for fencing mode; if true, then player cannot access the cell at all
  solvedBy?: {
    id: string;
    teamId: number;
  };
  parents?: {
    across: number;
    down: number;
  };
}
export type GridData = CellData[][];

export type CellIndex = Brand<number, 'CellIndex'>;
export const toCellIndex = (r: number, c: number, cols: number) => (r * cols + c) as CellIndex;

export interface GameJson {
  info: InfoJson;
  grid: GridData;
  teamGrids?: Record<number, GridData>; // TODO move to fencingState.teams[number].grid
  teamClueVisibility?: Record<
    number,
    {
      across: boolean[]; // true --> visible, false --> hidden
      down: boolean[];
    }
  >;
  solution: string[][];
  clues: CluesJson;
  circles?: CellIndex[];
  shades?: CellIndex[];
}

export interface UserJson {
  id: string;
  cursor?: Cursor;
  displayName: string;
  teamId?: number;
  score?: number;
  misses?: number;
}

export interface Cursor {
  id: string;
  r: number; // Row in puzzle
  c: number; // Column in puzzle
  timestamp: number;
  color?: string;
  active?: boolean;
  displayName?: string;
}

/**
 * PuzzleJson: the json format of puzzles stored in the db (both firebase & postgres)
 * Fields are a bit messy & don't correspond perfectly with puzjs formats... see logic in FileUploader.js
 */

export interface PuzzleJson {
  grid: string[][];
  solution: string[][];
  info: InfoJson;
  circles: string[];
  shades: string[];
  clues: CluesJson;
  private?: boolean;
}

export interface PuzzleStatsJson {
  numSolves: number;
}

export interface AddPuzzleRequest {
  puzzle: PuzzleJson;
  pid?: string; // if not provided, a new one is generated by backend
  isPublic: boolean;
}

export interface AddPuzzleResponse {
  pid?: string;
  duplicatePuzzle?: string;
}

export interface ListPuzzleStatsRequest {
  gids: string[];
}

export interface ListPuzzleRequest {
  filter: ListPuzzleRequestFilters;
  page: number;
  pageSize: number;
}

export interface ListPuzzleRequestFilters {
  sizeFilter: {
    Mini: boolean;
    Standard: boolean;
  };
  nameOrTitleFilter: string;
}

export interface ListPuzzleResponse {
  puzzles: {
    pid: string;
    content: PuzzleJson;
    stats: PuzzleStatsJson;
  }[];
}

export interface ListPuzzleStatsResponse {
  stats: {
    size: string;
    nPuzzlesSolved: number;
    avgSolveTime: number;
    bestSolveTime: number;
    bestSolveTimeGameId: string;
    avgCheckedSquareCount: number;
    avgRevealedSquareCount: number;
  }[];
  history: {
    puzzleId: string;
    gameId: string;
    title: string;
    size: string;
    dateSolved: string;
    solveTime: number;
    checkedSquareCount: number;
    revealedSquareCount: number;
  }[];
}

export interface CreateGameResponse {}

export interface CreateGameRequest {
  gid: string;
  pid: string;
}

export interface RecordSolveRequest {
  gid: string;
  time_to_solve: number;
}

export interface RecordSolveResponse {}

export type CellCoords = {r: number; c: number};
