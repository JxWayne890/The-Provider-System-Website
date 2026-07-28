import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
    return (
        <main className="grid min-h-[80dvh] place-items-center bg-primary px-5 pb-20 pt-40 text-white">
            <SEO
                title="Page Not Found"
                description="The requested page could not be found."
                url="/404"
                noindex
            />
            <div className="max-w-2xl text-center">
                <Compass className="mx-auto h-12 w-12 text-sun" aria-hidden="true" />
                <p className="eyebrow mt-8 text-sun">404</p>
                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] md:text-6xl">
                    This path does not lead to a live page.
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/62">
                    Use the service, work, Texas, or playbook hubs to find the closest current resource.
                </p>
                <Link to="/" className="button-primary mt-8">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Return home
                </Link>
            </div>
        </main>
    );
}
