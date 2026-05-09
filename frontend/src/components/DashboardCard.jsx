function DashboardCard({
    title,
    value
}) {

    return (
        <div className="
            bg-white
            rounded-2xl
            shadow
            p-5
            border
        ">

            <h3 className="
                text-gray-500
                text-sm
                mb-2
            ">
                {title}
            </h3>

            <p className="
                text-2xl
                font-bold
            ">
                {value}
            </p>

        </div>
    );
}

export default DashboardCard;