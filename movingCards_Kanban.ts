test("Dashboard page Task Button Creating Task Drag from todo to Inprogress", async ({ page }) => {

    // Creating a new Project

    const dashboardpage = new DashboardPage(page);
    const taskpage = new TaskPage(page);
  
    await loginUserNew(
      page,
      process.env.EMAIL_VALUE!,
      process.env.PASSWORD_VALUE!
    );
  
    const Name = await getRandomName(10);
    await Creation(Name, page);
  
    await SearchInMyList(Name, page);
    await dashboardpage.tasksButton.click();
    await assertTasksPageElementsVisible(taskpage);
  
    await taskpage.listButtonClick.click();
    await assertTasksPageListElementsVisible(taskpage);
  
    await taskpage.createTaskButton.click();
    await assertTasksPageCreateTaskElementsVisible(taskpage);
  
    const taskpagetitle = await getRandomName(10);
    await taskpage.setTaskCreateTitle(taskpagetitle);
    await taskpage.setTaskCreateDiscp("something");
  
    await taskpage.createTaskStartDateClick.click();
    await past_date(page);
    await taskpage.createTaskDueDateClick.click();
    await future_date(page);
    await taskpage.createTaskStatusClick.click();
    await taskpage.createTaskStatusToDo.click();
  
    await taskpage.createTaskAddLabelClick.click();
    await expect(page.getByRole('heading', { name: 'New Label' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Label' })).toBeVisible();
    const taskcreatelabel = await getRandomName(10); 
    await taskpage.setTaskAddLabel(taskcreatelabel);
    await taskpage.createTaskAddNewLabelButton.click();
  
    await taskpage.createTaskChecklistClick.click();
    await expect(page.getByRole('heading', { name: 'New Item' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeVisible();
    const taskchecklist = await getRandomName(10);
    await taskpage.setTaskChecklist(taskchecklist);
    await taskpage.createTaskChecklistAddItemButton.click();
  
    await taskpage.createTaskCreateButtonClick.click();
    await expect(page.getByText('Task created successfully')).toBeVisible();
    await page.waitForTimeout(500);

    // -----------------------------------------------------------------------------------------
    // Storing Locators in variables for future use

    const taskToDo = page.locator(``);
  
    const inProgressColumn = page.locator( ``);
    
    // -----------------------------------------------------------------------------------------
    //Used BoundingBox to get the position for the coordinates and move the task in steps

    const taskBox = await taskToDo.boundingBox();
    const inProgressBox = await inProgressColumn.boundingBox();
  
    if (taskBox && inProgressBox) {
      console.log("Dragging task to In Progress column...");
  
      await page.mouse.move(taskBox.x + taskBox.width / 2, taskBox.y + taskBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(inProgressBox.x + inProgressBox.width / 2, inProgressBox.y + inProgressBox.height / 2, { steps: 10 });
      await page.mouse.up();
  
      console.log("Task dragged to In Progress successfully.");
    }
  
    const taskInprogress = page.getByRole('button', { name: `${taskpagetitle} 1 something` });
    await expect(page.taskInprogress).toBeVisible();
    await page.waitForTimeout(1000);

    // -----------------------------------------------------------------------------------------
    //Function For Deleting a 

    await deleteFromDashBoard(Name, page);
  
  });