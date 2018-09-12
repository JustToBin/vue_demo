export default {
  getQueryObj() {
    let resultObj = {}; 
    let search = window.location.search; 
    if (search && search.length > 1) { 
      const _search = search.substring(1); 
      const items = _search.split('&'); 
      for (let index = 0; index < items.length; index++) { 
        if (!items[index]) { 
          continue; 
        }
        const kv = items[index].split('='); 
        resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1]; 
      } 
    } 
    return resultObj; 
  }
};
