const Debug = {
  print(level, tag, args) {
    if (process && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
      try {
        throw new Error();
      } catch (e) {
        console.group("*********** | " + tag + " | *************");
        let loc= e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "");
        console[level].apply(window, args);
        console.log("Location: "+loc+"");
        console.groupEnd();
      }
    }
  },
  log(tag, ...args) {
    if (process && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
      const level = "log";
      try {
        throw new Error();
      } catch (e) {
        console.group("*********** | " + tag + " | *************");
        let loc= e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "");
        console[level].apply(window, args);
        console.log("Location: "+loc+"");
        console.groupEnd();
      }
    }
  },
  info(tag, ...args) {
    if (process && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
      const level = "info";
      try {
        throw new Error();
      } catch (e) {
        console.group("*********** | " + tag + " | *************");
        let loc= e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "");
        console[level].apply(window, args);
        console.log("Location: "+loc+"");
        console.groupEnd();
      }
    }
  },
  warn(tag, ...args) {
    if (process && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
      const level = "warn";
      try {
        throw new Error();
      } catch (e) {
        console.group("*********** | " + tag + " | *************");
        let loc= e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "");
        console[level].apply(window, args);
        console.log("Location: "+loc+"");
        console.groupEnd();
      }
    }
  },
  error(tag, ...args) {
    if (process && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
      const level = "error";
      try {
        throw new Error();
      } catch (e) {
        console.group("*********** | " + tag + " | *************");
        let loc= e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "");
        console[level].apply(window, args);
        console.log("Location: "+loc+"");
        console.groupEnd();
      }
    }
  },
  breakpoint() {
    debugger;
  }
};

export default Debug;
