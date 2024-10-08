import React, { useState, useCallback, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';

interface AutoSearchProps {
  items: string[]
  onSelectItem: (item: string) => void
  label?: string
  placeholder?: string
  prefix?: React.ReactNode
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: string
  height?: string
}

const AutoSearch: React.FC<AutoSearchProps> = ({
  items,
  onSelectItem,
  label = 'Search ... ',
  placeholder = '',
  prefix,
  className = '',
  value = '',
  onChange,
  width = '100%',
  height = 'auto'
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      onChange?.(e);
      setVisible(true);
    },
    [onChange]
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const handleItemSelect = useCallback(
    (item: string) => {
      setSearchTerm(item);
      onSelectItem(item);
      setVisible(false);
    },
    [onSelectItem]
  );

  const menu = useMemo(
    () => (
      <Menu
        className="auto-search-menu"
        items={filteredItems.map((item, index) => ({
          key: index.toString(),
          label: item,
          onClick: () => handleItemSelect(item)
        }))}
        style={{ maxHeight: '200px', overflowY: 'auto' }}
      />
    ),
    [filteredItems, handleItemSelect]
  );

  return (
    <div
      className={`floating-label-container ${className}`}
      style={{
        width,
        height: height !== '' ? height : 'auto',
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        color: '#333'
      }}
    >
      {prefix != null && <span style={{ marginRight: '8px', fontSize: '18px' }}>{prefix}</span>}
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <label
          className={`floating-label ${isFocused || searchTerm !== '' ? 'focused' : ''}`}
          style={{
            position: 'absolute',
            top: isFocused || searchTerm !== '' ? '-22px' : '50%',
            left: '8px',
            transform: 'translateY(-50%)',
            fontSize: isFocused || searchTerm !== '' ? '12px' : '16px',
            color: isFocused ? '#000' : '#aaa',
            transition: 'all 0.2s ease'
          }}
        >
          {label}
        </label>
        <input
          className="auto-search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          onClick={() => setVisible(!visible)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            padding: '8px 12px',
            fontSize: '14px',
            backgroundColor: 'transparent'
          }}
        />
      </div>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        overlayStyle={{ width: '100%' }}
        open={visible}
        onOpenChange={setVisible}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      >
        <div className="auto-search-trigger" />
      </Dropdown>
    </div>
  );
};

AutoSearch.displayName = 'AutoSearch';

export default AutoSearch;
