const Projects = (data) => {
  const Projects = data?.userData?.projects;
  const completedProject =
    Projects && Projects?.filter((project) => project.status === "complete");

  const disputedProject =
    Projects && Projects?.filter((project) => project.status === "dispute");

  const btnStyle = (status) => {
    let colorClass = "text-yellow-500 border-yellow-500";

    if (status === "complete") {
      colorClass = "text-green-500 border-green-500";
    } else if (status === "dispute") {
      colorClass = "text-red-500 border-red-500";
    } else if (status === "rejected") {
      colorClass = "text-gray-900 border-gray-900";
    }
    return `bg-white rounded-full border ${colorClass}`;
  };

  const totalEarnings =
    Projects &&
    Projects?.reduce((acc, project) => {
      if (project?.status === "complete") {
        return acc + (project?.project_invoice?.amount || 0);
      }
      return acc;
    }, 0);

  return Projects && Projects?.length > 0 ? (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex-col space-y-5 items-left pb-2 m-10">
        <h1 className="text-xl font-low text-gray-800 dark:text-white">
          Projects (total earnings: {Number(totalEarnings).toFixed(2)})
        </h1>
        <h1 className="text-xl font-low text-gray-800 dark:text-white">
          Completed Projects: {completedProject?.length}
        </h1>
        <h1 className="text-xl font-low text-gray-800 dark:text-white">
          Disputed Projects: {disputedProject?.length}
        </h1>
      </div>
      {Projects?.map((project) => (
        <div
          className="flex flex-col items-left p-5 m-10 bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          key={project?.id}
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-l font-bold text-gray-800 dark:text-white">
              {project?.name}
            </h1>
            <button className={btnStyle(project?.status)}>
              {project?.status}
            </button>
          </div>
          <h3 className="text-l font-low text-gray-800 dark:text-white">
            {project?.description}
          </h3>
        </div>
      ))}
    </div>
  ) : (
    <div class="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-200">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Projects;
