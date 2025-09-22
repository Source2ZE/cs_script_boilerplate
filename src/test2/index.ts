import { print } from "@s2ze/debug";
import { clearInterval, delay, runSchedulerTick, setInterval, setTimeout } from "@s2ze/scheduler";
import { Instance } from "cs_script/point_script";

print("Loaded test2")

// setTimeout, setInterval, delay can be used everywhere (callbacks, here, etc...)
const timeout = setTimeout(() => {
  print("Ran after 10 seconds from the script start");
}, 10000)

let i = 1;
const interval = setInterval(async () => {
  print("Ran every second", i);
  await delay(500)
  print("delayed after 500ms")

  // stop after 5 runs
  if(i++ >= 5)
    clearInterval(interval);
}, 1000)

// Timers can be stopped with these:
// clearTimeout(timeout)
// clearInterval(interval)

Instance.SetThink(() => {
  // This has to run every tick
  Instance.SetNextThink(Instance.GetGameTime());
  runSchedulerTick();
})

Instance.SetNextThink(Instance.GetGameTime());