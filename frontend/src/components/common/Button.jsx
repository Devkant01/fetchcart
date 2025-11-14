export function Button({ children, variant = 'solid', className = '', disabled = false, ...props }) {
    const base = 'rounded-2xl px-8 py-4 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        solid: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
        outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100 shadow-sm hover:shadow-md',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
    };
    return (
        <button className={`${base} ${variants[variant]} ${className} ${disabled ? "cursor-progress" : "cursor-pointer"}`} {...props}>
            {children}
        </button>
    );
}