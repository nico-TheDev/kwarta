import { ICON_NAMES } from '@/constants/icons'
import { colors } from '@/constants/themes'
import { Icon } from '../IconLibrary/Icons'

const ColorPickerPanel = ({
    colorList,
    selectedColor,
    onColorPress,
    setShowColorWheel,
    errorMessage,
}) => {
    return (
        <div className="w-full mb-6">
            {/* Title */}
            <h2 className="text-[14px] text-black font-semibold">Colors</h2>

            {/* Colors container */}
            <div className="flex flex-wrap flex-1 gap-2">
                {/* Add / Selected color panel */}
                <div
                    onClick={() => setShowColorWheel(true)}
                    className={`
    w-12 h-12 flex items-center justify-center cursor-pointer
    border rounded-md relative overflow-hidden border-black
  `}
                    style={{ backgroundColor: selectedColor || 'white' }}
                >
                    {!selectedColor ? (
                        <Icon
                            name={ICON_NAMES.SYSTEM_ICONS.ADD}
                            color={colors.primary}
                        />
                    ) : (
                        <Icon
                            name={ICON_NAMES.SYSTEM_ICONS.EDIT}
                            color="white"
                        />
                    )}
                </div>

                {/* Color options */}
                {colorList.map((colorItem) => (
                    <div
                        key={colorItem.colorID}
                        onClick={() => onColorPress(colorItem.color)}
                        className="w-12 h-12 flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: colorItem.color }}
                    >
                        {selectedColor === colorItem.color && (
                            <div className="text-white">
                                <Icon
                                    name={ICON_NAMES.SYSTEM_ICONS.CHECK}
                                    color="inherit"
                                    size={30}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Error Message */}
            {errorMessage && (
                <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
            )}
        </div>
    )
}

export default ColorPickerPanel
