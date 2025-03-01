import { ISettingBase, SettingEditor, SettingValue } from '@rocket.chat/core-typings';
import { Callout, Field, Margins } from '@rocket.chat/fuselage';
import React, { ElementType, memo, ReactElement, ReactNode } from 'react';

import ActionSettingInput from './inputs/ActionSettingInput';
import AssetSettingInput from './inputs/AssetSettingInput';
import BooleanSettingInput from './inputs/BooleanSettingInput';
import CodeSettingInput from './inputs/CodeSettingInput';
import ColorSettingInput from './inputs/ColorSettingInput';
import FontSettingInput from './inputs/FontSettingInput';
import GenericSettingInput from './inputs/GenericSettingInput';
import IntSettingInput from './inputs/IntSettingInput';
import LanguageSettingInput from './inputs/LanguageSettingInput';
import LookupSettingInput from './inputs/LookupSettingInput';
import MultiSelectSettingInput from './inputs/MultiSelectSettingInput';
import PasswordSettingInput from './inputs/PasswordSettingInput';
import RelativeUrlSettingInput from './inputs/RelativeUrlSettingInput';
import RoomPickSettingInput from './inputs/RoomPickSettingInput';
import SelectSettingInput from './inputs/SelectSettingInput';
import SelectTimezoneSettingInput from './inputs/SelectTimezoneSettingInput';
import StringSettingInput from './inputs/StringSettingInput';

// @todo: the props are loosely typed because `Setting` needs to typecheck them.
const inputsByType: Record<ISettingBase['type'], ElementType<any>> = {
	boolean: BooleanSettingInput,
	string: StringSettingInput,
	relativeUrl: RelativeUrlSettingInput,
	password: PasswordSettingInput,
	int: IntSettingInput,
	select: SelectSettingInput,
	multiSelect: MultiSelectSettingInput,
	language: LanguageSettingInput,
	color: ColorSettingInput,
	font: FontSettingInput,
	code: CodeSettingInput,
	action: ActionSettingInput,
	asset: AssetSettingInput,
	roomPick: RoomPickSettingInput,
	timezone: SelectTimezoneSettingInput,
	lookup: LookupSettingInput,
	date: GenericSettingInput, // @todo: implement
	group: GenericSettingInput, // @todo: implement
};

type MemoizedSettingProps = {
	_id?: string;
	type: ISettingBase['type'];
	hint?: ReactNode;
	callout?: ReactNode;
	value?: SettingValue;
	editor?: SettingEditor;
	onChangeValue?: (value: unknown) => void;
	onChangeEditor?: (value: unknown) => void;
	onResetButtonClick?: () => void;
	className?: string;
	invisible?: boolean;
	label?: string;
	sectionChanged?: boolean;
	hasResetButton?: boolean;
	disabled?: boolean;
	enterpriseCallout?: ReactNode;
	actionText?: string;
};

const MemoizedSetting = ({
	type,
	hint = undefined,
	callout = undefined,
	value = undefined,
	editor = undefined,
	onChangeValue,
	onChangeEditor,
	disabled,
	enterpriseCallout,
	className = undefined,
	invisible = undefined,
	...inputProps
}: MemoizedSettingProps): ReactElement | null => {
	if (invisible) {
		return null;
	}

	const InputComponent = inputsByType[type];

	return (
		<Field className={className}>
			<InputComponent
				value={value}
				editor={editor}
				onChangeValue={onChangeValue}
				onChangeEditor={onChangeEditor}
				{...inputProps}
				disabled={disabled}
			/>
			{hint && <Field.Hint>{hint}</Field.Hint>}
			{callout && (
				<Margins block='x16'>
					<Callout type='warning'>{callout}</Callout>
				</Margins>
			)}
			{enterpriseCallout && (
				<Margins block='x16'>
					<Callout>{enterpriseCallout}</Callout>
				</Margins>
			)}
		</Field>
	);
};

export default memo(MemoizedSetting);
