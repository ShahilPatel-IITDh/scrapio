
			<div class="section">
				<div class="section-header">
					<div class="section-header-text">
						<div class="section-header-text-icon" v-if="section.type === 2" :style="{ backgroundImage: 'url(' + $root.CSS_GAME_ASSET_BASE + 'icons/' + (section.spell?.spell_icon_fid ?? section.icon_fid) + '.png)' }"></div>
						<div class="section-header-text-npc-icon" v-if="section.type === 1 && section.icon_display_id !== 0" :style="{ backgroundImage: 'url(' + $root.CSS_GAME_ASSET_BASE + 'portrait_icons/' + section.icon_display_id + '.png)' }"></div>
						{{ section.spell?.name ?? section.title }}
					</div>
					<div class="section-header-icons">
						<div class="section-icon" v-for="icon in $root.getSectionHeaderIcons(section)" :title="icon.title" :class="[icon.className]"></div>
					</div>
				</div>
				<div class="section-content">
					<div class="section-content-text" v-if="section.spell || section.text.length > 0" v-html="section.spell?.description ?? section.text"></div>
					<overview-section v-for="childSection in section.children" :section="childSection"></overview-section>
				</div>
			</div>
		