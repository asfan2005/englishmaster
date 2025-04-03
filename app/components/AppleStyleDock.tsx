'use client';

import {
  BookOpen,
  GraduationCap,
  HomeIcon,
  MessageSquare,
  Headphones,
  Users,
  Settings,
  CreditCard,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/',
  },
  {
    title: 'Dashboard',
    icon: (
      <LayoutDashboard className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/dashboard',
  },
  {
    title: 'Courses',
    icon: (
      <BookOpen className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/courses',
  },
  {
    title: 'Listening',
    icon: (
      <Headphones className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/listening',
  },
  {
    title: 'Speaking',
    icon: (
      <MessageSquare className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/speaking',
  },
  {
    title: 'Teachers',
    icon: (
      <GraduationCap className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/teachers',
  },
  {
    title: 'Community',
    icon: (
      <Users className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/community',
  },
  {
    title: 'Pricing',
    icon: (
      <CreditCard className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/pricing',
  },
  {
    title: 'Settings',
    icon: (
      <Settings className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/settings',
  },
];

export function AppleStyleDock() {
  return (
    <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2 z-20'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <Link key={idx} href={item.href} passHref style={{ display: 'block' }}>
            <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 cursor-pointer'>
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
} 