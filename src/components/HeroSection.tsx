import { Link } from 'react-router-dom'

type HeroSectionProps = {
    title: string
    description: string
    buttonText: string
    imageUrl: string
}

function HeroSection({
    title,
    description,
    buttonText,
    imageUrl,
}: HeroSectionProps) {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold">{title}</h1>

                        <p className="lead">
                            {description}
                        </p>

                        <Link to="/products" className="btn btn-primary btn-lg">
                            {buttonText}
                        </Link>
                    </div>

                    <div className="col-lg-6">
                        <div className="bg-body-secondary rounded overflow-hidden">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="img-fluid w-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection