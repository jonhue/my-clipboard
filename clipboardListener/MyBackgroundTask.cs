/*
 * using System;
 * using System.Collections.Generic;
 * using System.Linq;
 * using System.Text;
 * using System.Threading.Tasks;
 * 
 * namespace clipboardListener
 * {
 *     public sealed class Class1
 *     {
 *     }
 * }
 */

using Windows.ApplicationModel.Background;

namespace clipboardListener
{
    public sealed class MyBackgroundTask : IBackgroundTask
    {
        public void Run(IBackgroundTaskInstance taskInstance)
        {

        }

        // Deferral for asynchronous running
        BackgroundTaskDeferral _deferral; // Note: defined at class scope so we can mark it complete inside the OnCancel() callback if we choose to support cancellation
        public async void Run(IBackgroundTaskInstance taskInstance)
        {
            _deferral = taskInstance.GetDeferral()
            //
            // TODO: Insert code to start one or more asynchronous methods using the
            //       await keyword, for example:
            //
            // await ExampleMethodAsync();
            //

            _deferral.Complete();
        }
    }
}
