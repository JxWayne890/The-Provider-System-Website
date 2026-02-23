import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-primary pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] text-white">
            <div className="max-w-7xl mx-auto flex flex-col">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    <div className="col-span-1 md:col-span-2">
                        <Logo className="h-24 w-auto mb-6 filter brightness-0 invert" />
                        <p className="font-heading text-white/50 max-w-sm mb-8">
                            AI + automation systems that give business owners their time back without sacrificing peace.
                        </p>
                        {/* System Status */}
                        <div className="inline-flex items-center gap-3 bg-dark px-4 py-2 rounded-full border border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                            <span className="font-data text-xs text-green-500 tracking-wider">SYSTEM OPERATIONAL</span>
                        </div>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="font-heading font-semibold text-white/50 text-sm tracking-wider uppercase mb-2">Navigation</h4>
                        <a href="#features" className="hover:text-accent transition-colors font-heading">Systems</a>
                        <a href="#philosophy" className="hover:text-accent transition-colors font-heading">Philosophy</a>
                        <a href="#protocol" className="hover:text-accent transition-colors font-heading">Protocol</a>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="font-heading font-semibold text-white/50 text-sm tracking-wider uppercase mb-2">Legal</h4>
                        <a href="#" className="hover:text-accent transition-colors font-heading">Privacy Policy</a>
                        <a href="#" className="hover:text-accent transition-colors font-heading">Terms of Service</a>
                        <a href="#" className="hover:text-accent transition-colors font-heading">Data Processing</a>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/30 font-heading text-sm">
                    <p>&copy; {new Date().getFullYear()} The ProviderSystem. All rights reserved.</p>
                    <p className="mt-4 md:mt-0 font-data text-xs uppercase text-white/20">v1.0.0-PROD</p>
                </div>

            </div>
        </footer>
    );
}
