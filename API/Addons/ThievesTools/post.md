# ThievesTools

This addon tracks buffs/debuffs using the combatlog events to reduce overhead on UnitAura() calls. This makes a larger difference when tracking auras on multiple mobs. Status bars are created to track auras. These bars are highly configurable and sortable into groups that can be positioned. By default the groups are ‘target’ and ”untargetted’, with aura bars moving between them depending upon whether the aura target is your current target. Auras can be optionally pinned to the ‘target’ group when needed, such as important self buffs.
