export function Card({ children, className = '' }) {
    return (
        <div className={`rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
            {children}
        </div>
    );
}