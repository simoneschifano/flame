export const gameReducer = (state, action) => {
  const { type, payload } = action;
  const { userData, questions, currentQuestionIndex } = state;

  switch (type) {
    case "USER_INIT":
      return { ...state, userData: payload };
    case "UPDATE_PREFERRED_DIFFICULTY":
      return {
        ...state,
        userData: { ...userData, preferredDifficulty: payload },
      };
    case "UPDATE_QUESTION_STATE": {
      const { key, value } = payload;
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex][key] = value;

      return { ...state, questions: updatedQuestions };
    }
    // case "DELETE_TODO":
    //   return state.filter((todo) => todo.id !== payload);
    // case "UPDATE_TODO":
    //   return state.map((todo) => (todo.id === payload.id ? payload : todo));
    default:
      return state;
  }
};
