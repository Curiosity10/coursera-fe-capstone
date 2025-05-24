interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label, className = '' }) => (
  <li>
    <a 
      href={href} 
      className={`text-white hover:text-yellow-400 transition-colors font-medium ${className}`}
    >
      {label}
    </a>
  </li>
);
