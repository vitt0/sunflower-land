import {
  collectEggs as landExpansionCollectEggs,
  LandExpansionCollectEggAction as LandExpansionCollectEggsAction,
} from "./landExpansion/collectEgg";
import {
  LandExpansionPlantAction,
  plant as landExpansionPlant,
} from "./landExpansion/plant";
import {
  harvest as landExpansionHarvest,
  LandExpansionHarvestAction,
} from "./landExpansion/harvest";
import {
  chop as landExpansionChop,
  LandExpansionChopAction,
} from "./landExpansion/chop";
import {
  mineStone as landExpansionMineStone,
  LandExpansionStoneMineAction,
} from "./landExpansion/stoneMine";
import {
  mineGold as landExpansionMineGold,
  LandExpansionMineGoldAction,
} from "./landExpansion/mineGold";

import {
  mineIron as landExpansionIronMine,
  LandExpansionIronMineAction,
} from "./landExpansion/ironMine";

import {
  feedChicken as LandExpansionFeedChicken,
  LandExpansionFeedChickenAction,
} from "./landExpansion/feedChicken";

import { GameState } from "../types/game";
import { trade, TradeAction } from "./trade";
import { claimAirdrop, ClaimAirdropAction } from "./claimAirdrop";
import {
  placeBuilding,
  PlaceBuildingAction,
} from "./landExpansion/placeBuilding";
import {
  constructBuilding,
  ConstructBuildingAction,
} from "./landExpansion/constructBuilding";
import {
  placeCollectible,
  PlaceCollectibleAction,
} from "./landExpansion/placeCollectible";
import { cook, RecipeCookedAction } from "./landExpansion/cook";
import {
  collectRecipe,
  CollectRecipeAction,
} from "./landExpansion/collectRecipe";
import { feedBumpkin, FeedBumpkinAction } from "./landExpansion/feedBumpkin";
import { detectBot, DetectBotAction } from "./detectBot";
import { pickSkill, PickSkillAction } from "./landExpansion/pickSkill";
import { seedBought, SeedBoughtAction } from "./landExpansion/seedBought";
import {
  claimAchievement,
  ClaimAchievementAction,
} from "./landExpansion/claimAchievement";
import { buyChicken, BuyChickenAction } from "./landExpansion/buyChicken";
import { placeChicken, PlaceChickenAction } from "./landExpansion/placeChicken";
import {
  fulfillGrubOrder,
  FulFillGrubOrderAction,
} from "./landExpansion/fulfillGrubOrder";
import { craftTool, CraftToolAction } from "./landExpansion/craftTool";
import {
  buyDecoration,
  buyDecorationAction,
} from "./landExpansion/buyDecoration";
import { sellCrop, SellCropAction } from "./landExpansion/sellCrop";
import {
  fertilisePlot as landExpansionFertilise,
  LandExpansionFertiliseCropAction,
} from "./landExpansion/fertilisePlot";
import {
  removeCrop as landExpansionRemoveCrop,
  LandExpansionRemoveCropAction,
} from "./landExpansion/removeCrop";
import {
  removeBuilding,
  RemoveBuildingAction,
} from "./landExpansion/removeBuilding";
import {
  removeCollectible,
  RemoveCollectibleAction,
} from "./landExpansion/removeCollectible";
import {
  collectCropReward,
  CollectCropRewardAction,
} from "./landExpansion/collectCropReward";
import {
  collectTreeReward,
  CollectTreeRewardAction,
} from "features/game/events/landExpansion/collectTreeReward";
import {
  removeChicken,
  RemoveChickenAction,
} from "./landExpansion/removeChicken";
import { plantFruit, PlantFruitAction } from "./landExpansion/fruitPlanted";
import {
  harvestFruit,
  HarvestFruitAction,
} from "./landExpansion/fruitHarvested";
import {
  RemoveFruitTreeAction,
  removeFruitTree,
} from "./landExpansion/fruitTreeRemoved";
import {
  craftCollectible,
  CraftCollectibleAction,
} from "./landExpansion/craftCollectible";
import { sellTreasure, SellTreasureAction } from "./landExpansion/treasureSold";
import { restock, RestockAction } from "./landExpansion/restock";
import { sellGarbage, SellGarbageAction } from "./landExpansion/garbageSold";
import { startChore, StartChoreAction } from "./landExpansion/startChore";
import {
  completeChore,
  CompleteChoreAction,
} from "./landExpansion/completeChore";
import { placeTree, PlaceTreeAction } from "./landExpansion/placeTree";
import { expandLand, ExpandLandAction } from "./landExpansion/expandLand";
import { placePlot, PlacePlotAction } from "./landExpansion/placePlot";
import { placeStone, PlaceStoneAction } from "./landExpansion/placeStone";
import { placeGold, PlaceGoldAction } from "./landExpansion/placeGold";
import { placeIron, PlaceIronAction } from "./landExpansion/placeIron";
import {
  placeFruitPatch,
  PlaceFruitPatchAction,
} from "./landExpansion/placeFruitPatch";
import { ConversationEnded, endConversation } from "./landExpansion/converse";
import { MessageRead, readMessage } from "./landExpansion/readMessage";
import {
  moveCollectible,
  MoveCollectibleAction,
} from "./landExpansion/moveCollectible";
import { moveBuilding, MoveBuildingAction } from "./landExpansion/moveBuilding";
import { moveTree, MoveTreeAction } from "./landExpansion/moveTree";
import { moveCrop, MoveCropAction } from "./landExpansion/moveCrop";
import {
  moveFruitPatch,
  MoveFruitPatchAction,
} from "./landExpansion/moveFruitPatch";
import { moveIron, MoveIronAction } from "./landExpansion/moveIron";
import { moveStone, MoveStoneAction } from "./landExpansion/moveStone";
import { moveGold, MoveGoldAction } from "./landExpansion/moveGold";
import { pickMushroom, PickMushroomAction } from "./landExpansion/pickMushroom";
import { moveChicken, MoveChickenAction } from "./landExpansion/moveChicken";
import { Announcements } from "../types/conversations";
import { skipChore, SkipChoreAction } from "./landExpansion/skipChore";
import { deliverOrder, DeliverOrderAction } from "./landExpansion/deliver";
import { equip, EquipBumpkinAction } from "./landExpansion/equip";
import { refundBid, RefundBidAction } from "./landExpansion/refundBid";
import { mixPotion, MixPotionAction } from "./landExpansion/mixPotion";
import { buyWearable, BuyWearableAction } from "./landExpansion/buyWearable";
import { skipOrder, SkipOrderAction } from "./landExpansion/skipOrder";
import {
  completeBertObsession,
  CompleteBertObsessionAction,
} from "./landExpansion/completeBertObsession";
import { StartPotionAction, startPotion } from "./landExpansion/startPotion";
import { receiveTrade, ReceiveTradeAction } from "./landExpansion/receiveTrade";
import { listTrade, ListTradeAction } from "./landExpansion/listTrade";
import { cancelTrade, CancelTradeAction } from "./landExpansion/cancelTrade";
import { placeBud, PlaceBudAction } from "./landExpansion/placeBud";
import { moveBud, MoveBudAction } from "./landExpansion/moveBud";
import { removeBud, RemoveBudAction } from "./landExpansion/removeBud";
import {
  startComposter,
  StartComposterAction,
} from "./landExpansion/startComposter";
import {
  collectCompost,
  collectCompostAction,
} from "./landExpansion/collectCompost";
import {
  fertiliseFruitPatch,
  FertiliseFruitAction,
} from "./landExpansion/fertiliseFruitPatch";
import { castRod, CastRodAction } from "./landExpansion/castRod";
import { reelRod, ReelRodAction } from "./landExpansion/reelRod";
import {
  claimMilestone,
  ClaimMilestoneAction,
} from "./landExpansion/claimMilestone";
import { missFish, MissFishAction } from "./landExpansion/missFish";
import {
  tradeTentacle,
  TradeTentacleAction,
} from "./landExpansion/tradeTentacle";
import { revealLand, RevealLandAction } from "./landExpansion/revealLand";
import {
  burnCollectible,
  BurnCollectibleAction,
} from "./landExpansion/burnCollectible";
import { claimBonus, ClaimBonusAction } from "./landExpansion/claimBonus";

export type PlayingEvent =
  | TradeAction
  | LandExpansionPlantAction
  | LandExpansionFertiliseCropAction
  | LandExpansionRemoveCropAction
  | LandExpansionHarvestAction
  | LandExpansionChopAction
  | LandExpansionStoneMineAction
  | LandExpansionIronMineAction
  | LandExpansionMineGoldAction
  | ClaimAirdropAction
  | RecipeCookedAction
  | CollectRecipeAction
  | FeedBumpkinAction
  | DetectBotAction
  | PickSkillAction
  | SeedBoughtAction
  | ClaimAchievementAction
  | FulFillGrubOrderAction
  | LandExpansionFeedChickenAction
  | CraftToolAction
  | buyDecorationAction
  | SellCropAction
  | CollectCropRewardAction
  | CollectTreeRewardAction
  | LandExpansionCollectEggsAction
  | PlantFruitAction
  | HarvestFruitAction
  | RemoveFruitTreeAction
  | CraftCollectibleAction
  | SellTreasureAction
  | RestockAction
  | SellGarbageAction
  // Chores
  | StartChoreAction
  | CompleteChoreAction
  | SkipChoreAction
  | ExpandLandAction
  | ConversationEnded
  | MessageRead
  | PickMushroomAction
  // TODO - remove once landscaping is released
  | RemoveBuildingAction
  | RemoveCollectibleAction
  | RemoveChickenAction
  | DeliverOrderAction
  | EquipBumpkinAction
  | RefundBidAction
  | MixPotionAction
  | BuyWearableAction
  | SkipOrderAction
  | CompleteBertObsessionAction
  | StartPotionAction
  | ReceiveTradeAction
  | ListTradeAction
  | CancelTradeAction
  | StartComposterAction
  | collectCompostAction
  | FertiliseFruitAction
  | CastRodAction
  | ReelRodAction
  | ClaimMilestoneAction
  | MissFishAction
  | TradeTentacleAction
  | RevealLandAction
  | BurnCollectibleAction
  | ClaimBonusAction;

export type PlacementEvent =
  | ConstructBuildingAction
  | PlaceBuildingAction
  | PlaceCollectibleAction
  | BuyChickenAction
  | PlaceChickenAction
  | PlaceTreeAction
  | PlacePlotAction
  | PlaceStoneAction
  | PlaceGoldAction
  | PlaceIronAction
  | PlaceFruitPatchAction
  | buyDecorationAction
  | CraftCollectibleAction
  | MoveCollectibleAction
  | MoveBuildingAction
  | MoveCropAction
  | MoveFruitPatchAction
  | MoveTreeAction
  | MoveIronAction
  | MoveStoneAction
  | MoveGoldAction
  | MoveChickenAction
  | RemoveBuildingAction
  | RemoveCollectibleAction
  | RemoveChickenAction
  | PlaceBudAction
  | MoveBudAction
  | RemoveBudAction;

export type GameEvent = PlayingEvent | PlacementEvent;
export type GameEventName<T> = Extract<T, { type: string }>["type"];

export function isEventType<T extends PlayingEvent>(
  action: PlayingEvent,
  typeName: T["type"]
): action is T {
  return action.type === typeName;
}

/**
 * Type which enables us to map the event name to the payload containing that event name
 */
type Handlers<T> = {
  [Name in GameEventName<T>]: (options: {
    state: GameState;
    // Extract the correct event payload from the list of events
    action: Extract<GameEventName<T>, { type: Name }>;
    announcements?: Announcements;
    farmId?: number;
  }) => GameState;
};

export const PLAYING_EVENTS: Handlers<PlayingEvent> = {
  "item.traded": trade,
  "airdrop.claimed": claimAirdrop,
  "bot.detected": detectBot,
  "seed.planted": landExpansionPlant,
  "crop.harvested": landExpansionHarvest,
  "plot.fertilised": landExpansionFertilise,
  "crop.removed": landExpansionRemoveCrop,
  "chicken.collectEgg": landExpansionCollectEggs,
  "stoneRock.mined": landExpansionMineStone,
  "ironRock.mined": landExpansionIronMine,
  "goldRock.mined": landExpansionMineGold,
  "timber.chopped": landExpansionChop,
  "recipe.cooked": cook,
  "recipe.collected": collectRecipe,
  "bumpkin.feed": feedBumpkin,
  "skill.picked": pickSkill,
  "seed.bought": seedBought,
  "achievement.claimed": claimAchievement,
  "grubOrder.fulfilled": fulfillGrubOrder,
  "chicken.fed": LandExpansionFeedChicken,
  "tool.crafted": craftTool,
  "decoration.bought": buyDecoration,
  "crop.sold": sellCrop,

  "cropReward.collected": collectCropReward,
  "treeReward.collected": collectTreeReward,
  "fruit.planted": plantFruit,
  "fruit.harvested": harvestFruit,
  "fruitTree.removed": removeFruitTree,
  "collectible.crafted": craftCollectible,
  "treasure.sold": sellTreasure,
  "shops.restocked": restock,
  "garbage.sold": sellGarbage,
  "chore.completed": completeChore,
  "chore.started": startChore,
  "chore.skipped": skipChore,
  "land.expanded": expandLand,
  "conversation.ended": endConversation,
  "message.read": readMessage,
  "mushroom.picked": pickMushroom,
  // TODO - remove once landscaping is released
  "building.removed": removeBuilding,
  "collectible.removed": removeCollectible,
  "chicken.removed": removeChicken,
  "order.delivered": deliverOrder,
  "order.skipped": skipOrder,
  "bumpkin.equipped": equip,
  "bid.refunded": refundBid,
  "potion.mixed": mixPotion,
  "wearable.bought": buyWearable,
  "bertObsession.completed": completeBertObsession,
  "potion.started": startPotion,
  "trade.cancelled": cancelTrade,
  "trade.listed": listTrade,
  "trade.received": receiveTrade,
  "composter.started": startComposter,
  "compost.collected": collectCompost,
  "fruitPatch.fertilised": fertiliseFruitPatch,
  "rod.casted": castRod,
  "rod.reeled": reelRod,
  "milestone.claimed": claimMilestone,
  "fish.missed": missFish,
  "shelly.tradeTentacle": tradeTentacle,
  "land.revealed": revealLand,
  "collectible.burned": burnCollectible,
  "bonus.claimed": claimBonus,
};

export const PLACEMENT_EVENTS: Handlers<PlacementEvent> = {
  "building.constructed": constructBuilding,
  "building.placed": placeBuilding,
  "collectible.placed": placeCollectible,
  "chicken.bought": buyChicken,
  "chicken.placed": placeChicken,
  "tree.placed": placeTree,
  "plot.placed": placePlot,
  "stone.placed": placeStone,
  "gold.placed": placeGold,
  "iron.placed": placeIron,
  "fruitPatch.placed": placeFruitPatch,
  "decoration.bought": buyDecoration,
  "collectible.crafted": craftCollectible,
  "collectible.moved": moveCollectible,
  "building.moved": moveBuilding,
  "fruitPatch.moved": moveFruitPatch,
  "tree.moved": moveTree,
  "crop.moved": moveCrop,
  "iron.moved": moveIron,
  "stone.moved": moveStone,
  "gold.moved": moveGold,
  "chicken.moved": moveChicken,
  "building.removed": removeBuilding,
  "collectible.removed": removeCollectible,
  "chicken.removed": removeChicken,
  "bud.placed": placeBud,
  "bud.moved": moveBud,
  "bud.removed": removeBud,
};

export const EVENTS = { ...PLAYING_EVENTS, ...PLACEMENT_EVENTS };
