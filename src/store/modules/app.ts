const state = {
  userName: ""
};

const mutations = {
  SET_USER_NAME(state: { userName: any }, name: any) {
    state.userName = name;
  }
};
const actions = {
  setUserName({ commit }: any, name: any) {
    commit("SET_USER_NAME", name);
  }
};
export default {
  state,
  mutations,
  actions
};
