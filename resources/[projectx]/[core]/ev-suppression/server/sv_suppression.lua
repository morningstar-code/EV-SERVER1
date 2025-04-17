local BlacklistedModels = {
  -- Peds
  [`a_c_seagull`] = true,
  [`a_c_pigeon`] = true,
  [`a_c_rat`] = true,
  [`s_m_y_armymech_01`] = true,
  [`csb_mweather`] = true,
  [`csb_ramp_marine`] = true,
  [`s_m_m_marine_01`] = true,
  [`s_m_y_marine_01`] = true,
  [`s_m_m_marine_02`] = true,
  [`s_m_y_marine_02`] = true,
  [`s_m_y_marine_03`] = true,
  [`s_m_y_blackops_01`] = true,
  [`s_m_y_blackops_02`] = true,
  [`s_m_y_blackops_03`] = true,
  [`s_m_y_swat_01`] = true,
  [`s_f_y_cop_01`] = true,
  [`s_m_y_cop_01`] = true,
  [`csb_cop`] = true,
  [`s_m_y_hwaycop_01`] = true,
  [`s_m_m_security_01`] = true,
  [`mp_m_securoguard_01`] = true,
  [337826907] = true,
  
  -- Vehicle
  [`BLIMP`] = true,
  [`BLIMP2`] = true,
  [`JET`] = true,
  [`LAZER`] = true,
  [`TITAN`] = true,
  [`BARRACKS`] = true,
  [`BARRACKS2`] = true,
  [`CRUSADER`] = true,
  [`RHINO`] = true,
  [`POLICE`] = true,
  [`POLICE2`] = true,
  [`POLICE3`] = true,
  [`POLICE4`] = true,
  [`POLMAV`] = true,
  [`PREDATOR`] = true,
  [`AMBULANCE`] = true,
  [`BUZZARD`] = true,
  [`BUZZARD2`] = true,
  [`CARGOBOB`] = true,
  [`CARGOBOB2`] = true,
  [`CARGOBOB3`] = true,
  [`CARGOBOB4`] = true,
  [`SHERIFF`] = true,
  [`SHERIFF2`] = true,
  [`FIRETRUK`] = true,

  [`INFERNUS2`] = true,
  [`TORERO`] = true,
  [`STOCKADE`] = "moneytruck",
}

local BlacklistedProps = {
  [`apa_mp_apa_crashed_usaf_01a`] = true,
  [`apa_mp_apa_yacht_door`] = true,
  [`apa_mp_apa_yacht_door2`] = true,
  [`apa_mp_apa_yacht_jacuzzi_cam`] = true,
  [`apa_mp_apa_yacht_jacuzzi_ripple1`] = true,
  [`apa_mp_apa_yacht_jacuzzi_ripple2`] = true,
  [`apa_mp_apa_yacht_jacuzzi_ripple003`] = true,
  [`apa_mp_apa_yacht_o1_rail_a`] = true,
  [`apa_mp_apa_yacht_o1_rail_b`] = true,
  [`apa_mp_apa_yacht_o2_rail_a`] = true,
  [`apa_mp_apa_yacht_o2_rail_b`] = true,
  [`apa_mp_apa_yacht_o3_rail_a`] = true,
  [`apa_mp_apa_yacht_o3_rail_b`] = true,
  [`apa_mp_apa_yacht_option1`] = true,
  [`apa_mp_apa_yacht_option1_cola`] = true,
  [`apa_mp_apa_yacht_option2`] = true,
  [`apa_mp_apa_yacht_option2_cola`] = true,
  [`apa_mp_apa_yacht_option2_colb`] = true,
  [`apa_mp_apa_yacht_option3`] = true,
  [`apa_mp_apa_yacht_option3_cola`] = true,
  [`apa_mp_apa_yacht_option3_colb`] = true,
  [`apa_mp_apa_yacht_option3_colc`] = true,
  [`apa_mp_apa_yacht_option3_cold`] = true,
  [`stt_prop_wallride_05`] = true,
  [`stt_prop_wallride_05b`] = true,
  [`stt_prop_wallride_45l`] = true,
  [`stt_prop_wallride_45la`] = true,
  [`stt_prop_wallride_45r`] = true,
  [`stt_prop_wallride_45ra`] = true,
  [`stt_prop_wallride_90l`] = true,
  [`stt_prop_wallride_90lb`] = true,
  [`stt_prop_wallride_90r`] = true,
  [`stt_prop_wallride_90rb`] = true,
  [`test_prop_gravestones_01a`] = true,
  [`test_prop_gravestones_02a`] = true,
  [`test_prop_gravestones_04a`] = true,
  [`test_prop_gravestones_05a`] = true,
  [`test_prop_gravestones_07a`] = true,
  [`test_prop_gravestones_08a`] = true,
  [`test_prop_gravestones_09a`] = true,
  [`v_44_planeticket`] = true,
  [`v_ilev_bk_vaultdoor`] = true,
  [`v_ilev_found_cranebucket`] = true,
  [`v_res_fa_stones01`] = true,
  [`v_res_mexball`] = true,
  [`xm_prop_x17_shamal_crash`] = true,
  [`xm_prop_hamburgher_wl`] = true,
  [`xm_prop_plastic_bottle_wl`] = true,
}

local PropWhitelist = {
  [`prop_bowling_pin`] = true,
  [`prop_cash_case_01`] = true,
  [`prop_cs_ciggy_01`] = true,
  [`prop_notepad_01`] = true,
  [`prop_player_phone_01`] = true,
  [`prop_anim_cash_pile_01`] = true,
  [`prop_coffee_mac_02`] = true,
  [`prop_ecola_can`] = true,
  [`prop_security_case_01`] = true,
  [`prop_ld_case_01`] = true,
  [`prop_energy_drink`] = true,
  [`prop_amb_ciggy_01`] = true,
  [`prop_cs_hand_radio`] = true,
  [`prop_ld_health_pack`] = true,
  [`prop_cash_case_02`] = true,
  [`xm_prop_x17_bag_01a`] = true,
  [`prop_cigar_02`] = true,
  [`np_npc_card`] = true,
  [`p_ing_microphonel_01_lsbn`] = true,
  [`prop_drink_whisky`] = true,
  [`p_whiskey_bottle_s`] = true,
  [`prop_armour_pickup`] = true,
  [`prop_golf_iron_01`] = true,
  [`prop_amb_donut`] = true,
  [`prop_food_bs_chips`] = true,
  [`prop_megaphone_01`] = true,
  [`np_npc_card`] = true,
  [`p_ing_microphonel_01`] = true,
  [`prop_golf_iron_01`] = true,
  [`np_npc_binder`] = true,
  [`v_ilev_mp_bedsidebook`] = true,
  [`prop_vodka_bottle`] = true,
  [`p_cs_bottle_01`] = true,
  [`p_amb_coffeecup_01`] = true,
  [`p_amb_clipboard_01`] = true,
  [`prop_cs_cardbox_01`] = true,
  [`prop_idol_case_01`] = true,
  [`prop_golf_iron_01`] = true,
  [`hei_prop_heist_weed_block_01`] = true,
  [`prop_weed_bottle`] = true,
  [`prop_shots_glass_cs`] = true,
  [`prop_drink_redwine`] = true,
  [`prop_food_bs_juice01`] = true,
  [`prop_cs_street_binbag_01`] = true,
  [`prop_police_id_board`] = true,
  [`prop_cs_walking_stick`] = true,
  [`denis3d_policebadge_01`] = true,
  [`prop_boombox_01`] = true,
  [`prop_food_bs_coffee`] = true,
  [`hei_prop_hei_bust_01`] = true,
  [`prop_dym_pc_02`] = true,
  [`prop_taco_01`] = true,
  [`prop_golf_pitcher_01`] = true,
  [`prop_speaker_06`] = true,
  [`prop_meth_bag_01`] = true,
  [`ba_prop_battle_glowstick_01`] = true,
  [`prop_golf_iron_01`] = true,
  [`prop_golf_driver`] = true,
  [`prop_cs_brain_chunk`] = true,
  [`prop_sandwich_01`] = true,
  [`prop_golf_bag_01`] = true,
  [`prop_tennis_rack_01`] = true,
  [`ng_proc_food_aple2a`] = true,
  [`v_res_mcofcup`] = true,
  [`prop_cs_tablet`] = true,
  [`prop_beer_bottle`] = true,
  [`prop_golf_putter_01`] = true,
  [`prop_ld_flow_bottle`] = true,
  [`prop_tool_box_04`] = true,
  [`prop_amb_ciggy_01`] = true,
  [`prop_cigar_01`] = true,
  [`prop_ld_bomb`] = true,
  [`prop_v_bmike_01`] = true,
  [`ba_prop_battle_hobby_horse`] = true,
  [`prop_plastic_cup_02`] = true,
  [`prop_v_cam_01`] = true,
  [`prop_micro_02`] = true,
  [`prop_tv_flat_02`] = true,
  [`prop_cliff_paper`] = true,
  [`hei_prop_heist_drill`] = true,
  [`prop_pencil_01`] = true,
  [`prop_cs_burger_01`] = true,
  [`prop_bowling_ball`] = true,
  [`xm_prop_x17_bag_med_01a`] = true,
  [`prop_big_shit_01`] = true,
  [`prop_anim_cash_note`] = true,
  [`prop_oiltub_06`] = true,
  [`prop_amb_ciggy_01`] = true,
  [`prop_cs_heist_bag_01`] = true,
  [`prop_fishing_rod_01`] = true,
  [`prop_barrier_work05`] = true,
  [`prop_mp_cone_01`] = true,
  [`hei_prop_heist_thermite`] = true,
  [`prop_chair_01a`] = true,
  [`prop_cigar_03`] = true,
  [`hei_p_m_bag_var22_arm_s`] = true,
  [`p_parachute1_mp_s`] = true,
  [`ch_prop_ch_cash_trolley_01c`] = true,
  [`ch_prop_ch_cash_trolley_01c_empty`] = true,
  [`hei_prop_hst_laptop`] = true,
  [`hei_prop_heist_cash_pile`] = true,
  [`ch_prop_gold_bar_01a`] = true,
  [`prop_juicestand`] = true,
  [`p_attache_case_01_s`] = true,
  [`p_balaclavamichael_s`] = true,
  [`p_binbag_01_s`] = true,
  [`p_counter_04_glass`] = true,
  [`p_cs_beachtowel_01_s`] = true,
  [`p_cs_bottle_01`] = true,
  [`p_cs_bowl_01b_s`] = true,
  [`p_cs_clipboard`] = true,
  [`p_cs_clothes_box_s`] = true,
  [`p_cs_laptop_02`] = true,
  [`p_cs_laptop_02_w`] = true,
  [`p_cs_locker_01`] = true,
  [`p_cs_locker_01_s`] = true,
  [`p_cs_locker_02`] = true,
  [`p_cs_locker_door_01`] = true,
  [`p_cs_locker_door_01b`] = true,
  [`p_cs_locker_door_02`] = true,
  [`p_cs_shot_glass_s`] = true,
  [`p_cs_toaster_s`] = true,
  [`p_defilied_ragdoll_01_s`] = true,
  [`p_devin_box_01_s`] = true,
  [`p_dinechair_01_s`] = true,
  [`p_folding_chair_01_s`] = true,
  [`p_devin_box_01_s`] = true,
  [`p_dinechair_01_s`] = true,
  [`p_folding_chair_01_s`] = true,
  [`p_gaffer_tape_s`] = true,
  [`p_gasmask_s`] = true,
  [`p_idol_case_s`] = true,
  [`p_ilev_p_easychair_s`] = true,
  [`p_ing_coffeecup_01`] = true,
  [`p_ing_coffeecup_02`] = true,
  [`p_ing_microphonel_01`] = true,
  [`p_int_jewel_mirror`] = true,
  [`p_int_jewel_plant_01`] = true,
  [`p_int_jewel_plant_02`] = true,
  [`p_laptop_02_s`] = true,
  [`p_ld_am_ball_01`] = true,
  [`p_lev_sofa_s`] = true,
  [`p_orleans_mask_s`] = true,
  [`p_ortega_necklace_s`] = true,
  [`p_oscar_necklace_s`] = true,
  [`p_overalls_02_s`] = true,
  [`p_pallet_02a_s`] = true,
  [`p_panties_s`] = true,
  [`p_pantio_lounger1_s`] = true,
  [`p_pharm_unit_01`] = true,
  [`p_pharm_unit_02`] = true,
  [`p_planning_board_01`] = true,
  [`p_planning_board_02`] = true,
  [`p_planning_board_03`] = true,
  [`p_planning_board_04`] = true,
  [`p_res_sofa_l_s`] = true,
  [`p_soloffchair_s`] = true,
  [`p_tennis_bag_01_s`] = true,
  [`p_tourist_map_01_s`] = true,
  [`p_v_med_p_sofa_l_s`] = true,
  [`p_v_res_tt_bed_s`] = true,
  [`p_w_grass_gls_s`] = true,
  [`p_wade_necklace_s`] = true,
  [`p_whiskey_bottle_s`] = true,
  [`p_whiskey_notop`] = true,
  [`p_whiskey_notop_empty`] = true,
  [`p_yoga_mat_02_s`] = true,
  [`p_yoga_mat_03_s`] = true,
  [`p_ld_bs_bag_01`] = true,
  [`p_ld_sax`] = true,
  [`p_ld_soc_ball_01`] = true,
  [`p_watch_01`] = true,
  [`p_watch_02`] = true,
  [`p_watch_03`] = true,
  [`p_watch_04`] = true,
  [`p_watch_05`] = true,
  [`p_watch_06`] = true,
  [`p_armchair_01_s`] = true,
  [`p_s_scuba_tank_s`] = true,
  [`p_s_scuba_mask_s`] = true,
  [`p_amb_brolly_01`] = true,
  [`p_amb_brolly_01_s`] = true,
  [`prop_cs_crackpipe`] = true,
  [`prop_knife`] = true,
  [`prop_cs_steak`] = true,
  [`v_ilev_exball_blue`] = true,
  [`p_parachute1_mp_dec`] = true,
  [`p_parachute2_mp_dec`] = true,
  [`denis3d_teddyboe`] = true,
  [`np_boxing_bl_l`] = true,
  [`np_boxing_b_l`] = true,
  [`np_boxing_r_l`] = true,
  [`np_boxing_bl_r`] = true,
  [`np_boxing_b_r`] = true,
  [`np_boxing_r_r`] = true,
  [`prop_mug_02`] = true,
  [`prop_studio_light_02`] = true,
  [`prop_tool_pickaxe`] = true,
  [`prop_wateringcan`] = true,
  [`prop_cs_cardbox_01`] = true,
  [`w_am_digiscanner`] = true,
  [`prop_container_04a`] = true,
  [`w_ex_cash`] = true,
  [`w_ex_book`] = true,
  [`w_am_metaldetector`] = true,
  [`prop_golf_ball`] = true,
  [`prop_golf_tee`] = true,
  [`prop_golf_wood_01`] = true,
  [`prop_golf_iron_01`] = true,
  [`prop_golf_pitcher_01`] = true,
  [`prop_golf_putter_01`] = true,
  [`prop_golf_ball_p2`] = true,
  [`prop_golf_ball_p3`] = true,
  [`prop_golf_ball_p4`] = true,
  [`prop_cs_box_clothes`] = true,
  [`prop_hat_box_06`] = true,
  [`prop_tool_broom`] = true,
  [`prop_beach_sandcas_01`] = true,
  [`prop_beach_sandcas_03`] = true,
  [`prop_beach_sandcas_04`] = true,
  [`prop_beach_sandcas_05`] = true,
  [`prop_skid_chair_01`] = true,
  [`prop_skid_chair_02`] = true,
  [`prop_sign_road_01a`] = true,
  [`prop_golfflag`] = true,
  [`cg_chain`] = true,
  [`cg_chain2`] = true,
  [`gsf_chain`] = true,
  [`cerberus_chain`] = true,
  [`mdm_chain`] = true,
  [`esv_chain`] = true,
  [`koil_chain`] = true,
  [`seaside_chain`] = true,
  [`gg_chain`] = true,
  [`rl_chain`] = true,
  [`nbc_chain`] = true,
  [`np_squid_vip`] = true,
  [`np_vr_headset`] = true,
  [`prop_paint_spray01b`] = true,
  [`ba_prop_battle_rsply_crate_gr_02a`] = true,
  [`ss_trident`] = true,
  [`prop_acc_guitar_01_washed`] = true,
  [`prop_acc_guitar_01_roots`] = true,
  [`prop_acc_guitar_01_black`] = true,
  [`prop_acc_guitar_01_cross`] = true,
  [`prop_acc_guitar_01`] = true,
  [`prop_el_guitar_03_hubcap`] = true,
  [`prop_el_guitar_03_blue`] = true,
  [`prop_el_guitar_03_yellow`] = true,
  [`prop_el_guitar_03_anime`] = true,
  [`prop_el_guitar_03`] = true,
  [`prop_el_guitar_02`] = true,
  [`prop_el_guitar_01_pink`] = true,
  [`prop_el_guitar_01`] = true,
  [`prop_el_guitar_np_black`] = true,
  [`vw_prop_casino_art_guitar_01a`] = true,
  [`vw_prop_casino_art_guitar_01a_purple`] = true,
  [`prop_el_guitar_np_puppers`] = true,
  [`prop_cs_fuel_nozle`] = true,
  [`np_polaroid_a`] = true,
  [`np_polaroid_b`] = true,
  [`np_polaroid_c`] = true,
  [`np_poly_binder`] = true,
  [`np_poly_card`] = true,
  [`loq_atm_02_console`] = true,
  [`v_res_fridgemodsml_np`] = true,
  [`hunting_pelt_01_a`] = true,
  [`hunting_pelt_01_b`] = true,
  [`hunting_pelt_01_c`] = true,
  [`hunting_pelt_01_d`] = true,
  [`prop_ld_int_safe_01`] = true,
  [`hei_prop_heist_binbag`] = true,
  [`prop_bench_01a`] = true,
  [`prop_bench_09`] = true,
  [`prop_bench_06`] = true,
  [`v_res_r_silvrtray`] = true,
  [`p_ld_id_card_01`] = true,
  [`prop_dyn_pc_02`] = true,
  [`prop_barrel_exp_01a`] = true,
  [`np_wingsuit`] = true,
  [`np_wingsuit_open`] = true,
  [`np_wingsuit_b_open`] = true,
  [`np_wingsuit_closed`] = true,
  [`np_wingsuit_b_closed`] = true,
  [`prop_wooden_barrel`] = true,
  [`w_sb_vector`] = true,
  [`np_prop_magnet_01`] = true,
  [`w_sb_mp7`] = true,
  [`w_ar_bullpuprifle`] = true,
  [`w_ar_railgun`] = true,
  [`np_uranium_rod`] = true,
  [`bkr_prop_weed_drying_02a`] = true,
  [`w_lr_rpg`] = true,
  [`w_lr_rpg_rocket`] = true,
  [`w_sg_pumpshotgunmk2`] = true,
  [`w_sg_izh81`] = true,
  [`w_ar_assaultrifle2`] = true,
  [`w_ar_ak74`] = true,
  [`w_ar_scar`] = true,
  [`w_ar_m4`] = true,
  [`w_ar_draco`] = true,
  [`w_sb_mp5`] = true,
  [`w_sb_mpx`] = true,
  [`w_sr_sniperrifle2`] = true,
  [`hei_prop_pill_bag_01`] = true,
  [`bkr_prop_meth_smallbag_01a`] = true,
  [`bkr_prop_coke_cutblock_01`] = true,
  [`prop_money_bag_01`] = true,
  [`w_sr_dragunov`] = true,
  [`w_sr_m14`] = true,
  [`katana_sheath`] = true,
  [`katana_sheath_empty`] = true,
  [`w_me_machette_lr`] = true,
  [`w_ar_gepard`] = true,
  [`w_sb_microsmg3`] = true,
  [`w_sb_uzi`] = true,
  [`w_ar_groza`] = true,
  [`prop_gun_case_01`] = true,
  [`w_lr_homing`] = true,
  [`w_lr_homing_rocket`] = true,
  [`w_mg_mg`] = true,
  [`w_mg_flamethrower`] = true,
  [`w_am_staff`] = true,
  [`w_sb_gusenberg`] = true,
  [`w_sb_ppsh`] = true,
  [`w_sg_spas12`] = true,
  [`w_sb_tec9`] = true,
  [`w_ar_stg44`] = true,
  [`np_sprays_cg`] = true,
  [`np_sprays_ballas`] = true,
  [`np_sprays_gsf`] = true,
  [`np_sprays_kingz`] = true,
  [`np_sprays_mandem`] = true,
  [`np_sprays_vagos`] = true,
  [`np_sprays_bbmc`] = true,
  [`np_sprays_bsk`] = true,
  [`np_sprays_nbc`] = true,
  [`np_sprays_seaside`] = true,
  [`np_sprays_angels`] = true,
  [`np_sprays_lost`] = true,
  [`np_sprays_hydra`] = true,
  [`np_sprays_st`] = true,
  [`np_sprays_guild`] = true,
  [`np_sprays_ron`] = true,
  [`np_sprays_michael`] = true,
  [`np_sprays_dicegod`] = true,
  [`np_sprays_scu`] = true,
  [`np_sprays_mayhem`] = true,
  [`np_sprays_bcf`] = true,
  [`np_sprays_rust`] = true,
  [`np_sprays_pitchers`] = true,
  [`np_sprays_marabunta`] = true,
  [`np_sprays_yokai`] = true,
  [`np_sprays_pride`] = true,
  [`np_sprays_rm`] = true,
  [`np_sprays_hidden`] = true,
  [`np_sprays_saints`] = true,
  [`np_sprays_public_bowlcutgang`] = true,
  [`np_sprays_public_dirtybois`] = true,
  [`np_sprays_public_eastsidekingz`] = true,
  [`np_sprays_public_innercircle`] = true,
  [`np_sprays_public_lafamilia`] = true,
  [`np_sprays_public_northsidelegion`] = true,
  [`np_sprays_public_royalblack`] = true,
  [`np_sprays_public_saints`] = true,
  [`np_sprays_public_sinistersoulsmc`] = true,
  [`np_sprays_public_skullgang`] = true,
  [`np_sprays_public_spanonis`] = true,
  [`np_sprays_public_thecontientalfamily`] = true,
  [`np_sprays_public_thelegion`] = true,
  [`np_sprays_public_theroadmen`] = true,
  [`np_sprays_public_yokai`] = true,
  [`np_sprays_public_blackdogs`] = true,
  [`np_sprays_public_aztecas`] = true,
  [`np_sprays_public_bubblebois`] = true,
  [`np_sprays_rm_spain`] = true,
  [`np_sprays_st_spain`] = true,
  [`np_sprays_yokai_spain`] = true,
  [`np_sprays_gambino_spain`] = true,
  [`np_sprays_ZhaoShi`] = true,
  [`np_sprays_ph_01`] = true,
  [`np_sprays_ph_02`] = true,
  [`np_sprays_ph_03`] = true,
  [`np_sprays_ph_04`] = true,
  [`np_sprays_ph_05`] = true,
  [`np_sprays_baba_yaga`] = true,
  [`prop_kiva`] = true,
  [`prop_oil_controller`] = true,
  [`np_gangflag`] = true,
  [`np_gangflag_rust`] = true,
  [`np_gangflag_gsf`] = true,
  [`np_gangflag_mandem`] = true,
  [`np_gangflag_cg`] = true,
  [`np_gangflag_ballas`] = true,
  [`np_gangflag_hoa`] = true,
  [`np_gangflag_bsk`] = true,
  [`np_gangflag_marabunta`] = true,
  [`np_gangflag_bbmc`] = true,
  [`np_gangflag_seaside`] = true,
  [`np_gangflag_hydra`] = true,
  [`np_gangflag_angels`] = true,
  [`np_gangflag_gg`] = true,
  [`np_gangflag_vagos`] = true,
  [`np_gangflag_nbc`] = true,
  [`ch_prop_ch_heist_drill`] = true,
  [`ch_prop_laserdrill_01a`] = true,
  [`ch_prop_vault_drill_01a`] = true,
  [`gr_prop_gr_drill_01a`] = true,
  [`prop_beachball_01`] = true,
  [`np_billboard_01`] = true,
  [`np_billboard_02`] = true,
  [`np_billboard_03`] = true,
  [`np_sfsign_open`] = true,
  [`np_sfsign_closed`] = true,
  [`prop_letterbox_01`] = true,
  [`prop_letterbox_02`] = true,
  [`prop_letterbox_03`] = true,
  [`prop_prototype_minibomb`] = true,
  [`np_stage_spinnie_lights`] = true,
  [`np_cell_tower`] = true,
  [`np_bundy_sign`] = true,
  [`np_bones`] = true,
  [`np_cage_open`] = true,
  [`np_cage_closed`] = true,
  [`np_fx_barrel_fire`] = true,
  [`vw_prop_vw_valet_01a`] = true,
  [`np_prop_body_bag`] = true,
  [`np_fish_chest`] = true,
  [`np_fishnet_01`] = true,
  [`np_rocket_tanker`] = true,
  [`np_rocket_tanker_b`] = true,
  [`np_beehive`] = true,
  [`np_beehive02`] = true,
  [`np_beehive03`] = true,
  [`np_prop_ch_cash_trolly_01c`] = true,
  [`np_prop_gold_trolly_01c`] = true,
  [`np_prop_gold_trolly_01c_empty`] = true,
}

local CheatAttempts = {}
local LastAlert = {}

RPC.register('ev-suppression:getEntitySpawnData', function(src, pEntity)
  print(json.encode(pEntity))
end)

AddEventHandler("ev-fiber:exploiterAlert", function(pServerId, pMessage, pValue)
    if not CheatAttempts[pServerId] then CheatAttempts[pServerId] = 0 end

    CheatAttempts[pServerId] = CheatAttempts[pServerId] + 1

    if (CheatAttempts[pServerId] < 4) then return end

    local time = GetGameTimer()

    if (LastAlert[pServerId] ~= nil and (time - LastAlert[pServerId]) < 15000) then return end

    local user = exports["ev-base"]:getModule("Player"):GetUser(pServerId)
    local coords = GetEntityCoords(GetPlayerPed(pServerId))

    -- exports["ev-log"]:AddLog("Exploiter", user, message .. ("\nSteam: %s\nCoords: %s"):format(user.steamid, coords), value)

    LastAlert[pServerId] = time
end)    

RegisterServerEvent("exploiter")
AddEventHandler("exploiter", function(pMessage)
    local pServerId = source
    local System =  exports["ev-base"]:getModule("Admin").DB
    local user = exports["ev-base"]:getModule("Player"):GetUser(pServerId)

    if not CheatAttempts[pServerId] then CheatAttempts[pServerId] = 0 end

    CheatAttempts[pServerId] = CheatAttempts[pServerId] + 1

    if (CheatAttempts[pServerId] < 4) then return end

    local time = GetGameTimer()

    if (LastAlert[pServerId] ~= nil and (time - LastAlert[pServerId]) < 15000) then return end

    local coords = GetEntityCoords(GetPlayerPed(pServerId))
    LastAlert[pServerId] = time
    -- exports["ev-log"]:AddLog("Exploiter", user, message .. ("\nSteam: %s\nCoords: %s"):format(user.steamid, coords), value)
    System.banUser(self, pServerId, pServerId, "perm", pMessage)
end)    

local Bypassed = {}
local isPublicServer = nil

AddEventHandler("ev-suppression:bypass", function(pVehicle)
  Bypassed[pVehicle] = true
end)    

local currentTime = 0
local moneyTruckCooldown = 120000
local canSpawnMoneyTruckNow = false
local moneyTruckLastSpawnTime = 0

Citizen.CreateThread(function()
    while true do
      Citizen.Wait(60000)
      currentTime = GetGameTimer()
      if (not canSpawnMoneyTruckNow) and moneyTruckLastSpawnTime + moneyTruckCooldown < currentTime then
          canSpawnMoneyTruckNow = true
      end  
    end    
end)

RegisterNetEvent("entityCreating")
AddEventHandler("entityCreating", function(pEntity)
    if Bypassed[pEntity] then Bypassed[pEntity] = nil return end

    -- if PublicServer then
    --     isPublicServer = exports["ev-config"]:IsPublic()
    -- end
    
    local model = GetEntityModel(pEntity)

    if (PropWhitelist[model] or model == 0) then return end

    local entityType = GetEntityType(pEntity)

    --[[ if BlacklistedProps[model] or entityType == 3 then
        local owner = NetworkGetEntityOwner(pEntity)
        local coords = GetEntityCoords(pEntity)

        CancelEvent()

        if (owner == 0) then return end

        local data = { model = model, coords = coords }

        local message = ("User attempted to spawn blacklisted prop\nProp: %s"):format(model)

        TriggerEvent("ev-fiber:exploiterAlert", owner, message, data)

        return
    end ]]
    
    local ref = BlacklistedModels[model]
    
    if not ref then return end

    if ref == true then
        CancelEvent()
        return
    end

    if isPublicServer or not canSpawnMoneyTruckNow then
        CancelEvent()
        return
    end

    if canSpawnMoneyTruckNow and ref == "moneytruck" then
        canSpawnMoneyTruckNow = false
        moneyTruckLastSpawnTime = GetGameTimer()
        if math.random() > 0.2 then
            CancelEvent()
        end
    end
end)              
