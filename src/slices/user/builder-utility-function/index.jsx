export const addCases = (builder, operations) => {
  operations.forEach(({ action, onPending, onFulfilled, onRejected }) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        if (onPending) onPending(state);
      })
      .addCase(action.fulfilled, (state, action) => {
        state.loading = false;
        if (onFulfilled) onFulfilled(state, action);
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (onRejected) onRejected(state, action);
      });
  });
};
