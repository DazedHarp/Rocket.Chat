import type { Locator, Page } from '@playwright/test';

import { HomeFlextabMembers } from './home-flextab-members';
import { HomeFlextabNotificationPreferences } from './home-flextab-notificationPreferences';
import { HomeFlextabRoom } from './home-flextab-room';

export class HomeFlextab {
	private readonly page: Page;

	readonly members: HomeFlextabMembers;

	readonly room: HomeFlextabRoom;

	readonly notificationPreferences: HomeFlextabNotificationPreferences;

	constructor(page: Page) {
		this.page = page;
		this.members = new HomeFlextabMembers(page);
		this.room = new HomeFlextabRoom(page);
		this.notificationPreferences = new HomeFlextabNotificationPreferences(page);
	}

	get btnTabMembers(): Locator {
		return this.page.locator('[data-qa-id=ToolBoxAction-members]');
	}

	get btnRoomInfo(): Locator {
		return this.page.locator('[data-qa-id=ToolBoxAction-info-circled]');
	}

	get kebab(): Locator {
		return this.page.locator('[data-qa-id=ToolBox-Menu]');
	}

	get btnNotificationPreferences(): Locator {
		return this.page.locator('[data-qa-id=ToolBoxAction-bell]');
	}

	get flexTabViewThreadMessage(): Locator {
		return this.page.locator(
			'div.thread-list.js-scroll-thread ul.thread [data-qa-type="message"]:last-child div.message-body-wrapper [data-qa-type="message-body"]',
		);
	}

	get userInfoUsername(): Locator {
		return this.page.locator('[data-qa="UserInfoUserName"]');
	}
}
