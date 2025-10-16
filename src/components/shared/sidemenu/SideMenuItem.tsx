import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { IoChevronDownOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  href?: string;
  Icon: IconType;
  title: string;
  subTitle: string;
  children?: Props[];
}

export const SideMenuItem = ({ href, Icon, title, subTitle, children }: Props) => {
  const [open, setOpen] = useState(false);

  const isParent = children && children.length > 0;

  if (isParent) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-left text-slate-300 hover:text-white"
        >
          <div className="flex items-center space-x-3">
            <Icon className="text-lg text-secondary" />
            <div>
              <div className="text-lg font-bold text-secondary">{title}</div>
              <div className="text-sm text-white/90 hidden md:block">{subTitle}</div>
            </div>
          </div>
          <div>{open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}</div>
        </button>

        {open && (
          <div className="ml-8 mt-2 space-y-2">
            {children.map((child) => (
              <NavLink
                key={child.href}
                to={child.href!}
                className="block text-medium text-white/90 hover:text-secondary"
              >
                <div className="flex flex-col">
                  <span className="text-base">{child.title}</span>
                  <span className="text-sm text-white/60 hidden md:block">{child.subTitle}</span>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink to={href!} end className="mb-4 block text-secondary hover:text-yellow-500">
      <div className="flex items-center space-x-3">
        <Icon className="text-lg" />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-secondary">{title}</span>
          <span className="text-sm text-white/90 hidden md:block">{subTitle}</span>
        </div>
      </div>
    </NavLink>
  );
};
