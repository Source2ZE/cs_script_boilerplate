import { Instance } from "cs_script/point_script";
import { externalFunction } from "./test";
import { Euler, Vec3, Vector3Utils } from '@s2ze/math'
import { CSGearSlot, Team } from "@s2ze/types";
import { print } from "@s2ze/debug";

Instance.Msg("Loaded")

// This is how you can extend entity properties for extra fields, you can put this inside globals.d.ts to automatically propagate this across the entire project
declare module "cs_script/point_script" {
  interface Entity {
    // you should always mark the field as optional as you cannot gurantee a default value
    genericEntityField?: number;
  }

  interface CSPlayerController {
    playerSpecificField?: string
  }
}

// Example: storing entity data
{
  const player = Instance.GetPlayerController(0);
  // the js object corresponds to the lifetime of the entity, if you happen to hold this in a scope even after an entity is killed the data will be still available but .IsValid() will return false
  // it is 100% safe to store data and functions like this, this is very much an intended feature of the scripting system.
  // !!! ALl data including globalThis and data inside entities is scoped to the v8 isolate, every point_script has it's own v8 isolate (sandbox) thus you cannot share or conflict data in any way.
  if(player) {
    player.playerSpecificField = "naur";
    player.genericEntityField = 67;

    print(Instance.GetPlayerController(0)?.genericEntityField)
  }
}

{
  const player = Instance.GetPlayerController(0);
  print("player", Instance.FindEntityByClass("player"));
  if(player) {
    const pawn = player.GetPlayerPawn(); // while we can teleport a controller as every entity has teleport and it does actually still teleport the player, it's still not correct
    if(pawn) {
      const weapon = pawn.FindWeaponBySlot(CSGearSlot.PISTOL);
      print("Weapon:", weapon);
      player.JoinTeam(Team.T)
      pawn.Teleport({
        position: Vector3Utils.add(pawn.GetAbsOrigin(), new Vec3(0,0,20))
      });
      // OR
      const position = new Vec3(pawn.GetAbsOrigin());
      pawn.Teleport({
        position: position.add(new Vec3(0,0,20))
      })
    }
  }
}

Instance.SetThink(() => {
  const pawn = Instance.GetPlayerController(0)?.GetPlayerPawn();

  if(!pawn) return;

  const position = new Vec3(pawn.GetEyePosition());

  Instance.SetNextThink(Instance.GetGameTime());
  Instance.DebugScreenText({
    text: `Distance from 0, 0, 0: ${position.distance(Vec3.Zero)}`,
    x: 300,
    y: 50,
    duration: 0.01,
    color: { r: 0xff, g: 0, b: 0xff }
  })

  // Lock player's camera to the text sign in the script zoo map origin
  const targetAngles = position.lookAt(new Vec3(-160.18, 1088.12, -30));
  pawn.Teleport({
    angles: targetAngles
  })
  Instance.DebugScreenText({
    text: `Needed angles: ${targetAngles.toString()}`,
    x: 300,
    y: 80,
    duration: 0.01,
    color: { r: 0xff, g: 0, b: 0xff }
  });
})

Instance.SetNextThink(Instance.GetGameTime());

Instance.OnGunFire(() => {
  const pawn = Instance.GetPlayerController(0)?.GetPlayerPawn();
  if(!pawn) return;

  const position = new Vec3(pawn.GetAbsOrigin());
  const angles = new Euler(pawn.GetEyeAngles());

  // move the player to their left by 300 units when they shoot
  pawn.Teleport({
    position: position.add(angles.left.scale(300))
  });
  externalFunction();
})