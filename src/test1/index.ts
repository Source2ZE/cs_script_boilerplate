import { Instance } from "cs_script/point_script";
import { externalFunction } from "./test";
import { Euler, Vec3, Vector3Utils } from '@s2ze/math'
import { CSGearSlot, Team } from "@s2ze/types";
import { initializeErrorWrappers } from "@s2ze/debug";

initializeErrorWrappers()
Instance.Msg("Loaded")

{
  const player = Instance.GetPlayerController(0);
  const pawn = player.GetPlayerPawn(); // while we can teleport a controller as every entity has teleport and it does actually still teleport the player, it's still not correct
  const weapon = pawn.FindWeaponBySlot(CSGearSlot.PISTOL);
  Instance.Msg(weapon.toString());
  player.JoinTeam(Team.T)
  pawn.Teleport(Vector3Utils.add(pawn.GetAbsOrigin(), new Vec3(0,0,20)), null, null);
  // OR
  const position = new Vec3(pawn.GetAbsOrigin());
  pawn.Teleport(position.add(new Vec3(0,0,20)), null, null)
}

Instance.SetThink(() => {
  const pawn = Instance.GetPlayerController(0).GetPlayerPawn();
  const position = new Vec3(pawn.GetEyePosition());

  Instance.SetNextThink(Instance.GetGameTime());
  Instance.DebugScreenText(`Distance from 0, 0, 0: ${position.distance(Vec3.Zero)}`, 300, 50, 0.01, { r: 0xff, g: 0, b: 0xff })

  // Lock player's camera to 0,0,0 origin
  const targetAngles = position.lookAt(new Vec3(-160.18, 1088.12, -30));
  pawn.Teleport(null, targetAngles, null)
  Instance.DebugScreenText(`Needed angles: ${targetAngles.toString()}`, 300, 80, 0.01, { r: 0xff, g: 0, b: 0xff })
})

Instance.SetNextThink(Instance.GetGameTime());

Instance.OnGameEvent("weapon_fire" as any, async () => {
  const pawn = Instance.GetPlayerController(0).GetPlayerPawn();
  const position = new Vec3(pawn.GetAbsOrigin());
  const angles = new Euler(pawn.GetEyeAngles());

  // move the player to their left by 300 units when they shoot
  pawn.Teleport(position.add(angles.left.scale(300)), null, null);
  externalFunction();
})