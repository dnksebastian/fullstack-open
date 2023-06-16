const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        const goodScoreObj = {...state}
        goodScoreObj.good++
        return goodScoreObj
      case 'OK':
        const okScoreObj = {...state}
        okScoreObj.ok++
        return okScoreObj
      case 'BAD':
        const badScoreObj = {...state}
        badScoreObj.bad++
        return badScoreObj
      case 'ZERO':
        const resetObj = {...state}
        resetObj.good = 0
        resetObj.ok = 0
        resetObj.bad = 0
        return resetObj
      default: return state
    }
    
  }
  
  export default counterReducer